import * as angular from 'angular';
import {I<%= componentNameCapital %>} from './I<%= componentNameCapital %>';

export class <%= componentNameCapital %>EditController {
  static $inject: string[] = ['$state', '<%= componentNameCapital %>Repository', '$stateParams'];
  constructor(private $state: angular.ui.IStateService,
              private <%= componentName %>Repository: restangular.IElement,
              private $stateParams: angular.ui.IStateParamsService) {
    this.id = $stateParams['<%= componentName %>Id'];
    if (this.id !== undefined) {
      courseRepository.get(this.id).then((<%= componentName %>: I<%= componentNameCapital %>) => {
        this.<%= componentName %> = <%= componentName %>;
      });
    }
  }

  <%= componentName %>: I<%= componentNameCapital %>;
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
    this.<%= componentName %>Repository.post(this.<%= componentName %>).then((c: I<%= componentNameCapital %>) => {
      this.$state.go('<%= componentNamePlural %>.list');
    });
  }

  private edit(): void {
    this.<%= componentName %>.save().then((c: I<%= componentNameCapital %>) => {
      this.$state.go('<%= componentNamePlural %>.list');
    });
  }
}
