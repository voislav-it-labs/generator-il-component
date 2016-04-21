import * as angular from 'angular';
import {DemoController} from './DemoController';

describe('DemoController', () => {
  let $controller: angular.IControllerService,
    ctrl: DemoController;

  beforeEach(() => {
    angular.mock.module('secondApp.demo');
    inject((_$controller_) => {
      $controller = _$controller_;
    });
  });

  it('should have array of strings', () => {
    ctrl = $controller<DemoController>('DemoController', { });

    expect(ctrl.items).toEqual(['gi', 'is', 'awesome']);
  });
});
