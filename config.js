/* jshint node: true */

module.exports = {

	/**
	 * Input files locale
	 */
	locales: ['en'],

	/**
	 * Location to the files to localize
	 */
	srcFiles: ['./../busybusy-web-app/dist/assets/busy-app.js'],

	localizeAttributes: ['busy-loc'],
	localizeMethodIdentifiers: ['loc'],

	htmlFileRegExp: /\.hbs$/,
};
