/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from 'mongoose';
import { Searcher, SearcherResponse } from '../models/searcher.model';
import { BaseRepository } from '../../db/repositories/base.repository';
import { Service } from './_service.interface';
import { idx } from '../../core/utils/object.utils';

export abstract class BaseService<T extends mongoose.Document> implements Service<T> {
  public readonly repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  public async update(item: T): Promise<T> {
    try {
      console.log('Update Started: ' + JSON.stringify(item, null, 2));
      const result = await this.repository.update(item);
      return this.mapToJson(result);
    } catch (err) {
      throw new Error('Updating failed');
    } finally {
      console.log('Finishing Update');
    }
  }

  public async insert(item: T): Promise<string> {
    try {
      console.log('Inserting Started: ' + JSON.stringify(item, null, 2));
      return await this.repository.insert(item);
    } catch (error) {
      console.log(error);
      throw new Error('Inserting Failed...');
    } finally {
      console.log('Inserting Finished');
    }
  }

  public async findById(id: string): Promise<T | null> {
    console.log('FindById Started: ' + id);
    try {
      const result = await this.repository.findById(id);
      console.log('resultBeforMap', result);
      return this.mapToJson(result);
    } catch (error) {
      console.log(error);
      throw new Error('FindById Failed...');
    } finally {
      console.log('FindById Finished');
    }
  }

  public async search(searchModel: Searcher): Promise<SearcherResponse<T>> {
    try {
      console.log('Get Started: ' + JSON.stringify(searchModel, null, 2));
      const res = await this.repository.search(searchModel);
      if (res && res.data) {
        res.data = res.data.map(x => this.mapToJson(x));
      }
      return res;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get data...');
    } finally {
      console.log('Get finished');
    }
  }

  private mapToJson(item: T): T {
    console.log('map', item);
    return idx(item, _ => {
      console.log('result', item);
      const result = _.toJSON();
      console.log('result1', result);
      result.id = result._id;
      delete result._id;
      delete result.__v;
      console.log('result2', result);
      return result;
    });
  }
}
