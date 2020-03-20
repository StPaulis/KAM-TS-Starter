import { Context, Next } from 'koa';
import { ICompany } from '../../db/schemas';
import { Searcher } from '../../logic/models/searcher.model';
import * as services from '../../logic/services';

const serviceName = 'companiesService';

export const getCompaniesController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CompaniesService;
  const body = ctx.request.body as Searcher;
  ctx.body = await srv.search(body);
  await next();
};

export const getCompanyByIdController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CompaniesService;
  const id = ctx.params.id;
  ctx.body = await srv.findById(id);
  await next();
};

export const addCompanyController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CompaniesService;
  const body = ctx.request.body as ICompany;
  ctx.body = await srv.insert(body);
  await next();
};

export const updateCompanyController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CompaniesService;
  const body = ctx.request.body as ICompany;
  const result = await srv.update(body);

  if (result) {
    ctx.body = body;
  } else {
    throw new Error('Something went wrong while updating the company');
  }

  await next();
};

export const associateCategoryToCompanyController = async (ctx: Context, next: Next) => {
  const srv = ctx.scope.resolve(serviceName) as services.CompaniesService;
  const { companyId, categoryId } = ctx.request.body as { companyId: string; categoryId: string };

  const company = await srv.findById(companyId);

  // If exist, remove, otherwise, insert
  company.categories = company.categories.some(cat => cat.toString() === categoryId)
    ? company.categories.filter(x => x.toString() !== categoryId)
    : [...company.categories, categoryId];

  console.log('Association', company, ctx.request.body);
  const result = await srv.update(company);

  if (result) {
    ctx.body = result;
  } else {
    throw new Error('Something went wrong while associating category to company');
  }

  await next();
};
