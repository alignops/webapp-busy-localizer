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
		},
		update: {
			src: CONFIG.srcFiles,
			dest: 'locales/{locale}/i18n.json'
		},
		buildJS: {
			src: 'locales/**/i18n.json',
			dest: 'locales/{locale}/{locale}.js'
		},
		buildJSON: {
			src: 'locales/**/i18n.json',
			dest: 'locales/{locale}/{locale}.json'
		},
	};

	// Project configuration.
	grunt.initConfig({
		locales: locales,
		localizer: locales
	});

	// Load grunt locales
	grunt.loadNpmTasks('grunt-locales');
	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['update', 'buildJS', 'buildJSON']);

	grunt.registerTask('update', ['locales:update']);
	grunt.registerTask('buildJS', ['localizer:buildJS']);
	grunt.registerTask('buildJSON', ['localizer:buildJSON']);
};
