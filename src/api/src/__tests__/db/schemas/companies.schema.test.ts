import { CompanyModel, ICompany } from '../../../db/schemas';
import { idx } from '../../../core/utils';

describe('Company Schema Validation', () => {
  it('should be invalid if logoUrl is empty', done => {
    const newModel = new CompanyModel({
      name: 'Some Company',
    });

    newModel.validate(err => {
      expect(idx(err, _ => _.errors.name)).not.toBeNull();
      done();
    });
  });

  it('should be invalid if logoUrl is empty', done => {
    const newModel = new CompanyModel({
      logoUrl: 'Some Logo Url',
    });

    newModel.validate(err => {
      expect(idx(err, _ => _.errors.logoUrl)).not.toBeNull();
      done();
    });
  });

  it('should be valid if name and logoUrl is not empty', done => {
    const newModel = new CompanyModel({
      name: 'Some Company',
      logoUrl: 'Some Logo Url',
    });

    newModel.validate(err => {
      expect(idx(err, _ => _.errors.name)).toBeNull();
      expect(idx(err, _ => _.errors.logoUrl)).toBeNull();
      done();
    });
  });
});
