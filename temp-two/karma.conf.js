// Karma configuration
// Generated on Tue Feb 23 2016 17:56:02 GMT+0100 (Central European Standard Time)

var webpackConfig = require('./webpack.config');
var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/app.setup.spec.ts'
      //'test/**/*spec.ts'
    ],


    // list of files to exclude
    exclude: [
      'app/assets/**'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['ng-html2js'],
      '**/*.ts': ['webpack']
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        ),
      ],
      devtool: 'eval',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'junit'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    junitReporter: {
      outputFile: 'test-results.xml'
    },
    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,

    browserNoActivityTimeout: 60000,

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      stripPrefix: 'app/'
    }

  })
}
