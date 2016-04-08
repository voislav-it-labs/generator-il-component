import * as restangular from 'restangular';

<%= componentNameCapital %>Repository.$inject = ['Restangular'];
export function <%= componentNameCapital %>Repository(restangular: restangular.IService): restangular.IElement {
  return restangular.all('<%= componentNamePlural %>');
}
