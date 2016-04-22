import {name as giName} from '../gi.core/app/app';
import * as demo from './components/demo/module';
import * as angular from 'angular';
angular.module('<%= appName %>.templates', []);

export let name = '<%= appName %>';

angular.module(name, [
  giName,
  demo.name,
  '<%= appName %>.templates'
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
    $state.go('demo');
  });
}
