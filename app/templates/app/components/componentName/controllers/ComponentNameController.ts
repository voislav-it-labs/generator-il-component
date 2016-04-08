import * as restangular from 'restangular';
import {ICourse} from './ICourse';
import * as angular from 'angular';
import {BaseListController} from '../../shared/BaseListController';

interface IFilters {
  name: string;
  id: string;
}

/* a TODO file name camelCase/PascalCase ? */
export class CoursesController extends BaseListController<ICourse, IFilters> {
  static $inject: string[] = ['CourseRepository', 'NgTableParams', '$state', '$stateParams', '$q'];
  constructor(courseRepository: restangular.ICollection,
              ngTableParams: typeof NgTableParams,
              $state: angular.ui.IStateService,
              $stateParams: angular.ui.IStateParamsService,
              $q: angular.IQService) {
    super($stateParams, ngTableParams, $q);
    this.$state = $state;
    this.courseRepository = courseRepository;
  }

  courseRepository: restangular.ICollection;
  $state: angular.ui.IStateService;

  getDefaultFilter(): IFilters {
    return {name: '', id: ''};
  }

  getItems(params: NgTableParams<ICourse>): angular.IPromise<ICourse[]> | ICourse[] {
    /* TODO
      figure how gi handles filtering/sorting/paginating and implement it
      in base base class
    */
    return this.courseRepository.getList(params.filter);
  }

  add(): void {
    this.$state.go('courses.create');
  }

  edit(course: ICourse): void {
    this.$state.go('courses.edit', {courseId: course.id});
  }
}
