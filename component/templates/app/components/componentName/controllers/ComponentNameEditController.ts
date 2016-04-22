import * as angular from 'angular';
import {<%= componentNameCapital %>} from '../models/<%= componentNameCapital %>';

export class <%= componentNameCapital %>EditController {
  static $inject: string[] = ['$state', '<%= componentNameCapital %>Repository', '$stateParams'];
  constructor(private $state: angular.ui.IStateService,
              private <%= componentName %>Repository: restangular.IElement,
              private $stateParams: angular.ui.IStateParamsService) {
    this.id = this.$stateParams['<%= componentName %>Id'];
    if (this.id !== undefined) {
      this.<%= componentName %>Repository.get(this.id).then((<%= componentName %>: <%= componentNameCapital %>) => {
        this.<%= componentName %> = <%= componentName %>;
      });
    }
  }

  <%= componentName %>: <%= componentNameCapital %>;
  private id: string;

  save(): void {
    if (this.id !== undefined) {
      this.edit();
    } else {
      this.create();
    }
  }

  cancel(): void {
    this.$state.go('<%= componentNamePlural %>.list');
  }

  private create(): void {
    this.<%= componentName %>Repository.post(this.<%= componentName %>).then((c: <%= componentNameCapital %>) => {
      this.$state.go('<%= componentNamePlural %>.list');
    });
  }

  private edit(): void {
    this.<%= componentName %>.save().then((c: <%= componentNameCapital %>) => {
      this.$state.go('<%= componentNamePlural %>.list');
    });
  }
}
