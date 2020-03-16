import Router = require('koa-router');
import {
  getCategoriesController,
  addCategoryController,
  updateCategoryController,
} from '../controllers/categories.controller';

export const categoriesRouter = new Router({
  prefix: '/api/categories',
});

// TODO: maybe replace POST with GET using query params
/**
 * @api {post} /api/categories/search
 * @apiName Search for categories
 * @apiGroup Categories
 * @apiParamExample {json} Request-Example:
 * {
 *  start?: number;
 *  length?: number;
 *  filters: {
 *    name: string;
 *    value: any;
 *  }[];
 *  order?: {
 *    name: string;
 *    value: 'asc' | 'desc';
 *  }[];
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *   data: {
 *    id: string;
 *    name: string;
 *  }[],
 *  total: number;
 *  filtered: number;
 * }
 */
categoriesRouter.post('/search', getCategoriesController);

/**
 * @api {post} /api/categories
 * @apiName Add a category
 * @apiGroup Categories
 * @apiParamExample {json} Request-Example:
 * { name: string }
 * @apiSuccessExample {json} Success-Response: String
 */
categoriesRouter.post('/', addCategoryController);

/**
 * @api {put} /api/categories
 * @apiName Edit a category
 * @apiGroup Categories
 * @apiParamExample {json} Request-Example:
 * { id: string; name: string; }
 * @apiSuccessExample {json} Success-Response:
 * { id: string; name: string; }
 */
categoriesRouter.put('/', updateCategoryController);

