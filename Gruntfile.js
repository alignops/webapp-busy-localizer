/* jshint node: true */

const CONFIG = require('./config');

module.exports = function(grunt) {

	function getWithDefault(item, _default)
	{
		if(item !== undefined)
		{
			return item;
		}
		return _default;
	}

	var locales = {
		options: {
			locales: getWithDefault(CONFIG.locales, ['en_US']),
			localizeAttributes: getWithDefault(CONFIG.localizeAttributes, ['localize']),
			localizeMethodIdentifiers: getWithDefault(CONFIG.localizeMethodIdentifiers, ['localize']),
			htmlFileRegExp: getWithDefault(CONFIG.htmlFileRegExp, /\.html$/),
			hbsFileRegExp: getWithDefault(CONFIG.hbsFileRegExp, /\.hbs$/),
		},
		update: {
			src: CONFIG.srcFiles,
			dest: 'locales/{locale}/i18n.json'
		},
		buildJS: {
			src: 'locales/**/i18n.json',
			dest: 'locales/{locale}/i18n-prod.js'
		},
		buildJSON: {
			src: 'locales/**/i18n.json',
			dest: 'locales/{locale}/i18n-prod.json'
		},
		diffJS: {
			src: 'locales/**/i18n-prod.js',
			diff: CONFIG.diffFiles,
			dest: 'locales/{locale}/i18n-diff.json'
		}
	};

	// Project configuration.
	grunt.initConfig({
		locales: locales,
		localizer: locales
	});

	// Load grunt locales
	grunt.loadNpmTasks('ember-grunt-locales');
	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['clean', 'update', 'buildJS', 'buildJSON', 'diff']);

	grunt.registerTask('update', ['locales:update']);
	grunt.registerTask('buildJS', ['localizer:buildJS']);
	grunt.registerTask('buildJSON', ['localizer:buildJSON']);
	grunt.registerTask('diff', ['localizer:diffJS']);

	grunt.registerTask('clean', 'Deleting locales', function() {

		//remove locales
		if(grunt.file.isDir('./locales'))
		{
			grunt.file.delete('./locales');
		}
	});
};
