// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    reporters: ['progress', 'kjhtml'],

    customLaunchers: {
      /*
      *	this custom launcher requires setting env var CHROME_BIN=chromium-browser
      *	possible options for env var value depending on what you have installed:
      *	chromium-browser, chromium, google-chrome
      */
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--window-size=1680x1024',
          '--remote-debugging-port=9222',
          '--lang=EN-US',
          '--no-sandbox',
          '--disable-translate',
          '--disable-extensions',
          '--disable-web-security'
        ]
      }
    },

    browsers: ['ChromeHeadless'],

    browserNoActivityTimeout: 10000,
		browserDisconnectTimeout: 10000,

    singleRun: false,

    autoWatch: true,

    port: 9876,

    colors: true,

    logLevel: config.LOG_DEBUG

  });
};
