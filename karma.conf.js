const path = require('path');

module.exports = config => {
    require('dotenv').config({silent: true});

    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        reporters: ['progress', 'karma-typescript'],

        preprocessors: {
            'src/**/*.ts': ['karma-typescript']
        },

        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [require('karma-typescript-es6-transform')()]
            }
        },

        coverageReporter: {
            type: 'lcov',
            dir: '.coverage',
            subdir: browser => browser.toLowerCase().split(/[ /-]/)[0]
        },

        files: [
            require.resolve('sip.js/dist/sip'),
            require.resolve('getstats/getStats'),
            require.resolve('pubnub/dist/web/pubnub'),
            require.resolve('ringcentral/build/ringcentral'),
            {pattern: './audio/**/*.ogg', included: false},
            './src/**.ts'
        ],

        logLevel: config.LOG_INFO,

        browsers: [
            //TODO Firefox
            'ChromeNoSecurity'
        ],

        browserNoActivityTimeout: 60000,

        customLaunchers: {
            ChromeNoSecurity: {
                flags: [
                    '--use-fake-ui-for-media-stream',
                    '--use-fake-device-for-media-stream',
                    '--allow-http-screen-capture',
                    '--disable-web-security'
                ].concat(process.env.CI || process.env.TRAVIS ? ['--no-sandbox'] : []),
                chromeDataDir: path.resolve(__dirname, '.chrome'),
                base: 'Chrome'
            }
        },

        client: {
            captureConsole: true,
            showDebugMessages: true,
            env: process.env
        }
    });
};
