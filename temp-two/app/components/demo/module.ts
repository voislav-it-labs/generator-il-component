import * as angular from 'angular';
import {DemoController} from './controllers/DemoController';

angular.module('secondApp.demo', [])
  .controller('MainCtrl', DemoController);
