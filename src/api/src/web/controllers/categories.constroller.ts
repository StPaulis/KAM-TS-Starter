import {Context,Next} from 'koa';
import {ICategory} from '../../db/schemas';
import {Searcher} from '../../logic/models/searcher.model';
import * as services from '../../logic/services';
const serviceName = 'categoriesService';

export const getCategoriesController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CategoriesService;
  const body = ctx.request.body as Searcher;
  ctx.body = await srv.search(body);
  await next();
};

export const addCategoryController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CategoriesService;
  ctx.body = await srv.insert(ctx.request.body);
  await next();
};

export const updateCategoryController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CategoriesService;
  const body = ctx.request.body as ICategory;
  const result = await srv.update(body);

  if (result) {
    ctx.body = body;
  } else {
    throw new Error('Something went wrong while updating the category');
  }

  await next();
};
