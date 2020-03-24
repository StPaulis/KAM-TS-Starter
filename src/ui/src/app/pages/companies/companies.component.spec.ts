import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { fakeAsyncResponse } from 'src/app/shared/utils';
import { CompaniesComponent } from './companies.component';
import { Category, SearcherResponse, Searcher, Company } from 'src/app/models';
import { CompaniesApiService } from 'src/app/services/api/companies-api.service';
import { CategoriesApiService } from 'src/app/services/api/categories-api.service';
import { CategoriesDataService } from 'src/app/services/data/categories-data.service';

// #region Categories Mock Data
const categoryA = {
  id: 'anId',
  name: 'aName',
} as Category;

const categoryB = {
  id: 'anotherId',
  name: 'anotherName',
} as Category;

const categoriesApiServiceMock = {
  add(model: { name: string }): Observable<string> {
    return fakeAsyncResponse('newId');
  },
  edit(model: Category): Observable<Category> {
    return fakeAsyncResponse(categoryA);
  },
  search(model: Searcher): Observable<SearcherResponse<Category>> {
    return fakeAsyncResponse({
      data: [categoryA, categoryB],
      filtered: 2,
      total: 10,
    } as SearcherResponse<Category>);
  },
};
// #endregion

// #region Companies Mock Data
const companyA = {
  id: 'anId',
  categories: [categoryB.id],
  name: 'aName',
  logoUrl: 'a-url.com',
  email: 'some@email.com',
} as Company;

const companyB = {
  id: 'anotherId',
  name: 'anotherName',
  logoUrl: 'another-url.com',
} as Company;

const companiesApiServiceMock = {
  getbyId(id: string): Observable<Company> {
    return fakeAsyncResponse(companyA);
  },
  add(model: { name: string; logoUrl: string; email?: string }): Observable<string> {
    return fakeAsyncResponse('newId');
  },
  edit(model: Partial<Company>): Observable<Partial<Company>> {
    return fakeAsyncResponse(companyB);
  },
  search(model: Searcher): Observable<SearcherResponse<Company>> {
    return fakeAsyncResponse({
      data: [companyA, companyB],
      filtered: 2,
      total: 10,
    } as SearcherResponse<Company>);
  },
  associateCategory(model: { companyId: string; categoryId: string }): Observable<Company> {
    return fakeAsyncResponse(companyA);
  },
};
// #endregion

describe('Companies Component', () => {
  let component: CompaniesComponent;
  let fixture: ComponentFixture<CompaniesComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesComponent],
      providers: [
        { provide: CompaniesApiService, useValue: companiesApiServiceMock },
        { provide: CategoriesApiService, useValue: categoriesApiServiceMock },
      ],
      imports: [RouterTestingModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('Should instantiate', () => {
    expect(component).toBeDefined();
  });

  it('On category selected, component should load data ', async(async () => {
    spyOn(component, 'loadData');
    component.onSelectedCategoryChanged();
    await fixture.whenStable();
    expect(component.loadData).toHaveBeenCalled();
  }));

  it('On add Company clicked, CompanyModel should have value ', async(() => {
    component.onAddCompanyClicked();
    expect(!!component.companyModel).toBeTruthy();
  }));

  it('On add company submitted, component fire the api service ', async(async () => {
    spyOn(component, 'loadData');
    component.onAddCompanySubmited({} as Company);
    await fixture.whenStable();
    expect(component.loadData).toHaveBeenCalled();
    expect(component.companyModel).toBeNull();
  }));

  it('On edit company clicked, component should navigate ', async(async () => {
    component.onEditCompanyClicked({} as Company);
    expect(router.navigate).toHaveBeenCalled();
  }));

  it('On edit company submitted, component fire the api service and fix companies ', async(async () => {
    component.companies = [{ ...companyB, name: 'B' }];
    component.onEditCompanySubmited({} as Company);
    await fixture.whenStable();
    expect(component.companies).toEqual([companyB]);
  }));

  it('On add category clicked, Category Model should have value ', async(() => {
    component.onAddCategoryClicked();
    expect(!!component.categoryModel).toBeTruthy();
  }));

  it('On add category submitted, component should fire the api service and change data ', async(async () => {
    component.categories = [];
    const model = {} as Category;
    component.onAddCategorySubmited(model);
    await fixture.whenStable();
    expect(component.categoryModel).toBeNull();
  }));

  it('On edit category clicked, Category Model should have the new value ', async(() => {
    component.onEditCategoryClicked({ name: 'some name' } as Company);
    expect(component.categoryModel.name).toBe('some name');
  }));

  it('On edit category submited, component should fire the api service and change data ', async(async () => {
    component.onEditCategorySubmited({ name: 'some name' } as Company);
    await fixture.whenStable();
    expect(component.categoryModel).toBeNull();
  }));

  it('On associate category with company, component should fire the api service and change company data ', async(async () => {
    component.companies = [{} as Company];
    component.companyModel = {} as Company;
    component.onAssociateCategoryClicked({} as any);
    await fixture.whenStable();
    expect(component.companyModel.categories).toEqual(companyA.categories);
    expect(component.companies).toEqual([{} as Company]);
  }));

  it('When clearing companey model , component should navigate to companies/ ', async(async () => {
    component.clearCompanyModel();
    expect(component.companyModel).toBeNull();
    expect(router.navigate).toHaveBeenCalled();
  }));

  it('When loading data, component should fire api to fetch data ', async(async () => {
    component.loadData({ first: 0 });
    await fixture.whenStable();
    expect(component.companies).toEqual([companyA, companyB]);
    expect(component.page.first).toEqual(0);
    expect(component.page.total).toEqual(10);
  }));
});
