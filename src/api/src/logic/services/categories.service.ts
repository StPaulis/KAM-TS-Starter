import {CategoriesRepository} from '../../db/repositories';
import * as schemas from '../../db/schemas';
import {BaseService} from './base.service';

export class CategoriesService extends BaseService<schemas.ICategory> {
  constructor(ctx: { categoriesRepository: CategoriesRepository }) {
    super(ctx.categoriesRepository);
  }
}
