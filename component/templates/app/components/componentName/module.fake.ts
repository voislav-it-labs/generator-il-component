import * as angular from 'angular';
import * as gi from '../../../gi.core/app/app';
import {<%= componentNameCapital %>} from './models/<%= componentNameCapital %>';

export let name: string = '<%= appName %>.<%= componentName %>.fake';

import 'angular-mocks';

angular.module(name, ['ngMockE2E'])
  .run(runBlock);

runBlock.$inject = ['$httpBackend', 'RandomString'];
function runBlock($httpBackend: angular.IHttpBackendService, RandomString: any): void {
  let <%= componentNamePlural %>: <%= componentNameCapital %>[] = [
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)},
    {id: RandomString.generate(20), name: RandomString.generate(20)}
  ];

  $httpBackend.whenGET(new RegExp('http://emergenetics-gi-develop-admin.devweb.office.it-labs.com/<%= componentNamePlural %>(.*)'))
    .respond((method, url, data, headers, params) => {
      let pagination: gi.baseItems.PaginationRequest = JSON.parse(params.pagination);
      let filters = [];
      if (params.filters && params.filters.length) {
        for (let i = 0; i < params.filters.length; i++) {
          filters.push(JSON.parse(params.filters[i]));
        }
      }

      let results = [];
      for (let i = 0; i < <%= componentNamePlural %>.length; i++) {
        let matches = false;
        let <%= componentName %> = <%= componentNamePlural %>[i];

        function match(<%= componentName %>: <%= componentNameCapital %>, filter: gi.baseItems.Filter): boolean {
          if (!filter.value) {
            return true;
          }
          if (filter.column === 'id') {
            return <%= componentName %>.id.indexOf(filter.value) > -1;
          }

          if (filter.column === 'name') {
            return <%= componentName %>.name.toString() === filter.value;
          }

          return false;
        }

        for (let i = 0; i < filters.length; i++) {
          if (!match(<%= componentName %>, filters[i])) {
            break;
          }
          matches = true;
        }
        if (matches || filters.length === 0) {
          results.push(<%= componentName %>);
        }
      }

      let sortings = [];
      for (let i = 0; i < pagination.sortings.length; i++) {
        sortings.push([pagination.sortings[i].orderColumnName, pagination.sortings[i].sortOrder]);
      }
      results = _.orderBy(results, sortings);

      let total = results.length;

      results.splice(pagination.pageSize * (pagination.currentPage - 1) + pagination.pageSize);
      results = results.splice(pagination.pageSize * (pagination.currentPage - 1));
      return [200, {payload: results, meta: {currentPage: pagination.currentPage, pageSize: pagination.pageSize, total: total}}];
    });
}
