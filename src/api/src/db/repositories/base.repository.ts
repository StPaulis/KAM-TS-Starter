import mongoose from 'mongoose';
import { Searcher, SearcherResponse } from '../../logic/models/searcher.model';
import { Repository } from './_repository.interface';

export abstract class BaseRepository<T extends mongoose.Document> implements Repository<T> {
  public readonly db: mongoose.Model<T>;

  constructor(db: mongoose.Model<T>) {
    this.db = db;
  }

  public async update(item: T): Promise<T> {
    try {
      const id = item._id || item.id;
      console.log(id);
      return await this.db.findByIdAndUpdate(new mongoose.Types.ObjectId(id), item, { new: true }).exec();
    } catch (error) {
      console.error(error);
      throw new Error('Update failed');
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const res = await this.db.findByIdAndDelete(id).exec();
      return !!res;
    } catch (error) {
      console.error(error);
      throw new Error('Delete failed');
    }
  }

  public async insert(item: T): Promise<string> {
    try {
      const res = await this.db.create(item);
      return res ? res._id : null;
    } catch (error) {
      console.error(error);
      throw new Error('Could not insert item: ' + JSON.stringify(item, null, 2));
    }
  }

  public async findById(id: string): Promise<T | null> {
    return await this.db.findById(id).exec();
  }

  // The function below is responsible to create a db query from the input object
  // and return the results in a certain format.
  // It is usefull for paging, sorting and filtering and it can be extented for more complex scenarios
  public async search(searchModel: Searcher): Promise<SearcherResponse<T>> {
    const match: { $match: { [key: string]: any } }[] = [];
    const sort: { $sort: { [key: string]: 1 | -1 } }[] = [];

    // Create Match Expressions
    searchModel.filters.forEach(filter => {
      const query = {} as any;
      query[filter.name] = filter.value;
      const aggr = { $match: query };
      match.push(aggr);
    });

    // Create Sort Expressions
    if (searchModel.order) {
      searchModel.order.forEach(order => {
        const query = {} as any;
        query[order.name] = order.value === 'asc' ? 1 : -1;
        const aggr = { $sort: query };
        sort.push(aggr);
      });
    }

    // Make the query & format the results
    const result = (await this.db
      .aggregate([
        ...match,
        ...sort,
        {
          $facet: {
            data: [
              { $skip: searchModel.start ? searchModel.start : 0 },
              {
                $limit: searchModel.length ? searchModel.length : Number.MAX_SAFE_INTEGER,
              },
            ],
            metadata: [{ $count: 'total' }],
          },
        },
      ])
      .exec()) as { data: T[]; metadata: { total: number }[] }[];

    if (result && result.length && result[0].metadata && result[0].data) {
      return {
        data: result[0].data,
        filtered: result[0].data.length,
        total: result[0].metadata.length ? result[0].metadata[0].total : 0,
      };
    } else {
      throw new Error('Could not fetch');
    }
  }
}
