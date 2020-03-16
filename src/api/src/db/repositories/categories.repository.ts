import { BaseRepository } from './base.repository';
import * as schemas from '../schemas';

export class CategoriesRepository extends BaseRepository<schemas.ICategory> {
  constructor() {
    super(schemas.CategoryModel);
  }
}
