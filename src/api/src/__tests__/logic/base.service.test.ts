import { mongo } from 'mongoose';
import { CategoriesRepository } from '../../db/repositories';
import { CategoryModel, ICategory } from '../../db/schemas/category.schema';
import { CategoriesService } from '../../logic/services';

const newId = new mongo.ObjectID();
const newSuccessItem = {
  _id: newId,
  name: 'SomeName',
  toJSON: () => {
    return { _id: newId, name: 'SomeName', __v: {} };
  },
} as ICategory;

// We use Category Model to ensure Base Service Functionality
describe('Insert', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(CategoryModel, 'create');
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('Should create a new company successfully!', async () => {
    const newCategory = {
      name: 'Some Company',
    } as ICategory;

    spy.mockReturnValueOnce({ _id: 'id', ...(newCategory as any) });

    const srv = new CategoriesService({ categoriesRepository: new CategoriesRepository() });
    const result = await srv.insert(newCategory);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual('id');
  });

  it('Should return null if create does not return property with name {_id}!', async () => {
    const newCategory = {} as ICategory;

    spy.mockReturnValueOnce(null);

    const srv = new CategoriesService({ categoriesRepository: new CategoriesRepository() });
    const result = await srv.insert(newCategory);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });
});

describe('Get By Id', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(CategoryModel, 'findById');
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('Should fetch an element by successfully and have and property Id!', async () => {
    spy.mockReturnValueOnce({
      exec: () => newSuccessItem as any,
    });

    const srv = new CategoriesService({ categoriesRepository: new CategoriesRepository() });
    const result = await srv.findById('');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('id');
  });

  it('Should return null if find does not fetch anything!', async () => {
    spy.mockReturnValueOnce({ exec: () => null as any });

    const srv = new CategoriesService({ categoriesRepository: new CategoriesRepository() });
    const result = await srv.findById('');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.id).toBeUndefined();
  });
});

describe('Update', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(CategoryModel, 'findByIdAndUpdate');
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('Should update an element successfully and have and property Id!', async () => {
    spy.mockReturnValueOnce({
      exec: () => newSuccessItem as any,
    });

    const srv = new CategoriesService({ categoriesRepository: new CategoriesRepository() });
    const result = await srv.update(newSuccessItem);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('id');
  });

  it('Should return null if fupdate failed!', async () => {
    spy.mockReturnValueOnce({ exec: () => null as any });

    const srv = new CategoriesService({ categoriesRepository: new CategoriesRepository() });
    const result = await srv.update({} as undefined);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.id).toBeUndefined();
  });
});

describe('Search With Filters', () => {
  let spy: jest.SpyInstance<any>;
  beforeEach(() => {
    spy = jest.spyOn(CategoryModel, 'aggregate');
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('Should create the agrregation requested successfully!', async () => {
    spy.mockReturnValueOnce({
      exec: () => [{ data: [], metadata: { total: 0 } }],
    });

    const srv = new CategoriesService({ categoriesRepository: new CategoriesRepository() });
    await srv.search({
      start: 2,
      length: 10,
      filters: [
        {
          name: 'name',
          value: 'name1',
        },
      ],
      order: [
        {
          name: 'name',
          value: 'asc',
        },
      ],
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).lastCalledWith([
      { $match: { name: 'name1' } },
      { $sort: { name: 1 } },
      { $facet: { data: [{ $skip: 2 }, { $limit: 10 }], metadata: [{ $count: 'total' }] } },
    ]);
  });
});
