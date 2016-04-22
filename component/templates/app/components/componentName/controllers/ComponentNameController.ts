import * as restangular from 'restangular';
import * as gi from '../../../../gi.core/app/app';
import {<%= componentNameCapital %>} from '../models/<%= componentNameCapital %>';
import * as angular from 'angular';

export interface <%= componentNameCapital %>StateParams extends angular.ui.IStateParamsService {
  test: string;
}

export class <%= componentNameCapital %>Controller extends gi.baseItems.BaseListController<<%= componentNameCapital %>> {
  static $inject: string[] = ['$q', 'Restangular', '$stateParams', '$location', '$state'];
  constructor(
    $q: angular.IQService,
    restangular: restangular.IElement,
    $stateParams: <%= componentNameCapital %>StateParams,
    $location: angular.ILocationService,
    $state: angular.ui.IStateService
  ) {
    super($q, restangular, $location, $state, $stateParams);

    let filterConfig: gi.baseItems.FiltersConfiguration = [];
    let initialPagination: gi.baseItems.PaginationRequest = new gi.baseItems.PaginationRequest();
    let repository: gi.baseItems.RestangularItemsRepository<<%= componentNameCapital %>> = new gi.baseItems.RestangularItemsRepository<<%= componentNameCapital %>>(restangular.all('<%= componentName %>'));

    this.init(filterConfig, initialPagination, repository)
      .then(() => {
        return this.queryItems();
      });
  }

  add(): void {
    this.$state.go('<%= componentNamePlural %>.create');
  }

  edit(<%= componentName %>: <%= componentNameCapital %>): void {
    this.$state.go('<%= componentNamePlural %>.edit', {<%= componentName %>Id: <%= componentName %>.id});
  }
}
