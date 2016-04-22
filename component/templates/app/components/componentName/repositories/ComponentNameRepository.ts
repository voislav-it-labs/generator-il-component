import * as restangular from 'restangular';

export class <%= componentNameCapital %>RepositoryProvider {
  constructor() {
    this.$get.$inject = ['Restangular'];
  }

  $get(restangular: restangular.IService): restangular.IElement {
    return restangular.all('<%= componentNamePlural %>');
  }
}
