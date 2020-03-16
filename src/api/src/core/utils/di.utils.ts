import * as awilix from 'awilix';
import {CategoriesRepository} from '../../db/repositories';
import {CategoriesService} from '../../logic/services';

export let containerRegistries: awilix.NameAndRegistrationPair<any> = {};

containerRegistries = {
  categoriesRepository: awilix.asClass(CategoriesRepository).singleton(),
  categoriesService: awilix.asClass(CategoriesService).scoped(),
};
