// import {name} from '../app/app';
// import 'angular-mocks';
//
// let a: string = name;
// a = 'used';

// used for optimization of test execution. looses ability to run single test
declare var require;
import 'angular';
import 'angular-mocks';

let testsContext = require.context('.', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
