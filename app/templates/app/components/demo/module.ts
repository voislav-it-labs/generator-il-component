import * as angular from 'angular';
import {DemoController} from './controllers/DemoController';
declare var require;

export let name: string = '<%= appName %>.demo';

angular.module(name, [])
  .controller('DemoController', DemoController)
  .config(configBlock);

configBlock.$inject = ['$stateProvider'];
function configBlock($stateProvider: angular.ui.IStateProvider): void {
  $stateProvider.state('demo', {
    url: '/demo',
    templateUrl: require('./views/index.html'),
    controller: DemoController,
    controllerAs: 'DemoCtrl'
  });
}
