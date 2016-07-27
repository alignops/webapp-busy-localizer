/* jshint node: true */

module.exports = {

	/**
	 * Input files locale
	 */
	locales: ['en'],

	/**
	 * Location to the files to localize
	 */
	//srcFiles: ['./../busybusy-web-app/dist/assets/busy-app.js'],
	srcFiles: [
		'./../busy-time/app/**/*.js',
	//	'./../busybusy-web-app/dist/assets/busy-app.js',
		'./../busy-time/app/templates/**/*.hbs'
	],
	diffFiles: './../busy-time/app/langs/es.js',

	localizeAttributes: ['busy-loc'],
	localizeMethodIdentifiers: ['loc'],
};
