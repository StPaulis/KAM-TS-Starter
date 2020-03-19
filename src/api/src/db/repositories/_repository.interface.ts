import mongoose from 'mongoose';
import {Searcher, SearcherResponse} from '../../logic/models/searcher.model';

export interface Repository<T extends mongoose.Document> {
  update(item: T): Promise<T>;
  insert(item: T): Promise<string>;

  search(searchModel: Searcher): Promise<SearcherResponse<T>>;
  findById(id: string): Promise<T | null>;
}
