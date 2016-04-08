import * as angular from 'angular';
import * as state from 'angular-ui-router';
import {CourseRepository} from './CourseRepository';
import {CoursesController} from './coursesController';
import {CourseEditController} from './CourseEditController';

class CoursesConfig {
  static $inject: string[] = ['$stateProvider'];
  constructor($stateProvider: state.IStateProvider) {
    $stateProvider.state('<%= componentNamePlural %>', {
      template: '<div ui-view></div>'
    })
    .state('<%= componentNamePlural %>.list', {
      url: '/<%= componentNamePlural %>?name&id',
      templateUrl: 'components/<%= componentNamePlural %>/views/list.html',
      controller: CoursesController,
      controllerAs: '<%= componentNameCapitalPlural %>Ctrl'
    })
    .state('<%= componentNamePlural %>.create', {
      url: '/<%= componentNamePlural %>/new',
      templateUrl: 'components/<%= componentNamePlural %>/views/edit.html',
      controller: CourseEditController,
      controllerAs: 'CourseEditCtrl'
    })
    .state('<%= componentNamePlural %>.edit', {
      url: '/<%= componentNamePlural %>/edit/:courseId',
      templateUrl: 'components/<%= componentNamePlural %>/views/edit.html',
      controller: CourseEditController,
      controllerAs: '<%= componentNameCapital %>EditCtrl'
    });
  }
}

export let name: string = 'app.<%= componentNamePlural %>';

angular.module(name, [])
  .factory('CourseRepository', CourseRepository)
  .controller('CoursesController', CoursesController)
  .config(CoursesConfig)
  .run(function($rootScope: angular.IRootScopeService): void {
    $rootScope.$on('$stateChangeError', function(): void {
      console.log('state change error:', arguments);
    });
  });
