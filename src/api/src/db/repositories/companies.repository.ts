import {BaseRepository} from './base.repository';
import * as schemas from '../schemas'

export class CompaniesRepository extends BaseRepository<schemas.ICompany> {
    constructor() {
      super(schemas.CompanyModel);
    }
  }