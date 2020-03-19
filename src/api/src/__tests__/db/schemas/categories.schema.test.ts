import { CategoryModel } from '../../../db/schemas';
import { idx } from '../../../core/utils';

describe('Category Schema Validation', () => {
  it('should be invalid if name is empty', done => {
    const newModel = new CategoryModel();

    newModel.validate(err => {
      expect(idx(err, _ => _.errors.name)).not.toBeNull();
      done();
    });
  });

  it('should be valid if name is filled', done => {
    const newModel = new CategoryModel({ name: 'SomeName' });

    newModel.validate(err => {
      expect(idx(err, _ => _.errors.name)).toBeNull();
      done();
    });
  });
});
