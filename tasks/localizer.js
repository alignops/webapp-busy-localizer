
/*jslint regexp: true, unparam: true, nomen: true */
/*global module, require, global, __dirname */
module.exports = function(grunt)
{
    'use strict';

	function Build(task)
	{
		this.options = task.options({
            locales: ['en'],
            localizeAttributes: [
                'localize'
            ],
            localizeMethodIdentifiers: [
                'localize'
            ],
            htmlFileRegExp: /\.html$/,
            jsFileRegExp: /\.js$/,
            // Matches the locale name in a file path,
            // e.g. "en_US" in js/locale/en_US/i18n.json:
            localeRegExp: /\w+(?=\/[^\/]+$)/,
            localePlaceholder: '{locale}',
            localeName: 'i18n',
		});

		this.grunt = grunt;
		this.task = task;
		this.done = task.async();

		this.getSourceFiles = function ()
		{
            var files = this.task.filesSrc;
            if (this.task.args.length)
			{
                files = this.task.args;
            }

			return files.filter(function (file)
			{
                if (!grunt.file.exists(file))
				{
                    grunt.log.warn('Source file ' + file.cyan + ' not found.');
                    return false;
                }
                return true;
            });
        };

		this.getDirName = function()
		{
			return __dirname;
		};

		this.getFilePath = function (type)
		{
            var dest = this.task.files.length && this.task.files[0][type];
            if (!dest) {
                grunt.fail.warn('Missing destination file path.');
                return this.done();
            }
            return dest;
        };

		this.getLocaleFromPath = function (path)
		{
            var regexp = this.options.localeRegExp,
                localeMatch = regexp.exec(path),
                locale = localeMatch && localeMatch[0];
            if (!locale) {
                grunt.fail.warn(
                    'Regular expression ' + regexp.toString().cyan +
                        ' failed to match locale in path ' +
                        path.cyan + '.'
                );
                return this.done();
            }
            return locale;
        };

        require('../lib/' + this.task.target)(this);
	}

	grunt.registerMultiTask('localizer', 'busybusy localized files', function()
	{
		return new Build(this);
	});
};
