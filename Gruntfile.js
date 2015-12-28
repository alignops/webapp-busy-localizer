
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        locales: {
            options: {
                locales: ['en_US']
            },
            update: {
                src: [
                // './../busybusy-web-app/**/*.hbs',
                './../busybusy-web-app/dist/assets/busy-app.js'
                // 'test/test.js'
                ],
                dest: 'test/files3.json'
            },
            build: {
                src: 'js/locales/**/i18n.json',
                dest: 'js/locales/{locale}/i18n.js'
            },
            'export': {
                src: 'js/locales/**/i18n.json',
                dest: 'js/locales/{locale}/i18n.csv'
            },
            'import': {
                src: 'js/locales/**/i18n.csv',
                dest: 'js/locales/{locale}/i18n.json'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-locales');

};
