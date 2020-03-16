import * as awilix from 'awilix';
import {CategoriesRepository, CompaniesRepository} from '../../db/repositories';
import {CategoriesService, CompaniesService} from '../../logic/services';

export let containerRegistries: awilix.NameAndRegistrationPair<any> =  {
  categoriesRepository: awilix.asClass(CategoriesRepository).singleton(),
  categoriesService: awilix.asClass(CategoriesService).scoped(),

  companiesRepository: awilix.asClass(CompaniesRepository).singleton(),
  companiesService: awilix.asClass(CompaniesService).scoped(),
};
