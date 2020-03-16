import * as mongoose from 'mongoose';
import { Searcher, SearcherResponse } from '../models/searcher.model';

export interface Service<T extends mongoose.Document> {
  search(searchModel: Searcher): Promise<SearcherResponse<T>>;
  update(item: T): Promise<T>;
  insert(item: T): Promise<string>;
  findById(id: string): Promise<T>;
}
