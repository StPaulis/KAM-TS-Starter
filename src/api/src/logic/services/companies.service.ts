import { CompaniesRepository } from '../../db/repositories/companies.repository';
import * as schemas from '../../db/schemas';
import { BaseService } from './base.service';

export class CompaniesService extends BaseService<schemas.ICompany> {
  constructor(ctx: { companiesRepository: CompaniesRepository }) {
    super(ctx.companiesRepository);
  }
}
