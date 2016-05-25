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
		'./../busybusy-web-app/app/**/*.js',
	//	'./../busybusy-web-app/dist/assets/busy-app.js',
		'./../busybusy-web-app/app/templates/**/*.hbs'
	],
	diffFiles: './../busybusy-web-app/app/langs/es.js',

	localizeAttributes: ['busy-loc'],
	localizeMethodIdentifiers: ['loc'],
};
