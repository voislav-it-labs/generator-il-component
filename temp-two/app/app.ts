import * as angular from 'angular';
import {name as giName} from '../gi.core/app/app';

export let name = 'secondApp';

angular.module(name, [
  giName
])
.config(config);

config.$inject = ['RolesProvider', '$stateProvider', '$urlRouterProvider', 'StateProvider'];
function config(
  rolesProvider: any,
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider,
  stateProvider: any
): void {
  angular.forEach(stateProvider.defaultStates, (value, key) => {
    console.log('registering', key, value);
    $stateProvider.state(key, value);
  });

  $urlRouterProvider.otherwise(($injector) => {
    let $state = $injector.get('$state');
    $state.go('users.list');
  });
}
