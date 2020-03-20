import Router = require('koa-router');
import {
  addCompanyController,
  associateCategoryToCompanyController,
  getCompaniesController,
  getCompanyByIdController,
  updateCompanyController,
} from '../controllers';

export const companiesRouter = new Router({
  prefix: '/api/companies',
});

/**
 * @api {post} /api/companies/search
 * @apiName Search for companies
 * @apiGroup Companies
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
companiesRouter.post('/search', getCompaniesController);

/**
 * @api {post} /api/companies
 * @apiName Add a company
 * @apiGroup Companies
 * @apiParamExample {json} Request-Example:
 * {
 *    name: string;
 *    logoUrl: string;
 *    email: string;
 * }
 * @apiSuccessExample {string} Success-Response:
 * { String }
 */
companiesRouter.post('/', addCompanyController);

/**
 * @api {put} /api/companies
 * @apiName Edit a company
 * @apiGroup Companies
 * @apiParamExample {json} Request-Example:
 * {
 *    id: string;
 *    name: string;
 *    logoUrl: string;
 *    email: string;
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *    id: string;
 *    name: string;
 *    logoUrl: string;
 *    email: string;
 * }
 */
companiesRouter.put('/', updateCompanyController);


/**
 * @api {get} /api/companies/{id}
 * @apiName Get a company by Id
 * @apiGroup Companies
 * @apiSuccessExample {json} Success-Response:
 * {
 *    id: string;
 *    name: string;
 *    logoUrl: string;
 *    email: string;
 *    categories: string[];
 * }
 */
companiesRouter.get('/:id', getCompanyByIdController);

/**
 * @api {post} /api/companies/category
 * @apiName Associate Company to Category
 * @apiGroup Companies
 * @apiParamExample {json} Request-Example:
 * { companyId: string; categoryId: string }
 * @apiSuccessExample {json} Success-Response:
 * {
 *    id: string;
 *    name: string;
 *    logoUrl: string;
 *    email: string;
 *    categories: string[];
 * }
 */
companiesRouter.post('/category', associateCategoryToCompanyController);
