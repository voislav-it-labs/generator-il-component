import * as angular from 'angular';
import * as state from 'angular-ui-router';
import {<%= componentNameCapital %>RepositoryProvider} from './repositories/<%= componentNameCapital %>Repository';
import {<%= componentNameCapital %>Controller} from './controllers/<%= componentNameCapital %>Controller';
import {<%= componentNameCapital %>EditController} from './controllers/<%= componentNameCapital %>EditController';
import * as fake from './module.fake';

<%= componentName %>Config.$inject = ['$stateProvider'];
function <%= componentName %>Config ($stateProvider: state.IStateProvider): void {

  $stateProvider.state('<%= componentNamePlural %>', {
    template: '<div ui-view></div>'
  })
  .state('<%= componentNamePlural %>.list', {
    url: '/<%= componentNamePlural %>?name&id',
    templateUrl: 'components/<%= componentName %>/views/list.html',
    controller: <%= componentNameCapital %>Controller,
    controllerAs: '<%= componentNameCapitalPlural %>Ctrl'
  })
  .state('<%= componentNamePlural %>.create', {
    url: '/<%= componentNamePlural %>/new',
    templateUrl: 'components/<%= componentName %>/views/edit.html',
    controller: <%= componentNameCapital %>EditController,
    controllerAs: '<%= componentNameCapital %>EditCtrl'
  })
  .state('<%= componentNamePlural %>.edit', {
    url: '/<%= componentNamePlural %>/edit/:courseId',
    templateUrl: 'components/<%= componentName %>/views/edit.html',
    controller: <%= componentNameCapital %>EditController,
    controllerAs: '<%= componentNameCapital %>EditCtrl'
  });
}

export let name: string = '<%= determineAppname() %>.<%= componentName %>';

angular.module(name, [fake.name])
  .provider('<%= componentNameCapital %>Repository', <%= componentNameCapital %>RepositoryProvider)
  .controller('<%= componentNameCapital %>Controller', <%= componentNameCapital %>Controller)
  .controller('<%= componentNameCapital %>EditController', <%= componentNameCapital %>EditController)
  .config(<%= componentName %>Config);
