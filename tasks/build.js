
/*jslint regexp: true, unparam: true, nomen: true */
/*global module, require, global, __dirname */
module.exports = function(grunt)
{
    'use strict';

	function Build(task)
	{
		this.options = task.options({
            locales: ['en_US'],
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
            // Set to true to wrap static translation strings with a function:
            wrapStaticTranslations: false,
            // Purge obsolete locale messages by default:
            purgeLocales: true,
            messageFormatLocaleFile: 'messageformat/locale/{locale}.js',
            messageFormatSharedFile: 'messageformat/lib/messageformat.include.js',
            localeTemplate: __dirname + '/../i18n.js.tmpl',
            // Allow ftp, http(s), mailto, anchors
            // and messageformat variables (href="{url}"):
            urlRegExp: /^((ftp|https?):\/\/|mailto:|#|\{\w+\})/,
            htmlmin: {
                removeComments: true,
                collapseWhitespace: true
            },
            htmlminKeys: false,
            jsonSpace: 2,
            csvEncapsulator: '"',
            csvDelimiter: ',',
            csvLineEnd: '\r\n',
            csvEscape: function (str) {
                return str.replace(/"/g, '""');
            },
            csvKeyLabel: 'ID',
            csvExtraFields: ['files']
		});
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

		this.getDestinationFilePath = function ()
		{
			console.log('files', this.task.files, this.task);
            var dest = this.task.files.length && this.task.files[0].dest;
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
        },

		this.run = function()
		{
			var that = this;
			console.log('running getDestinationFilePath');
            var dest = this.getDestinationFilePath();

			console.log('running getSourceFiles');

            this.getSourceFiles().forEach(function (file)
			{
				console.log('running getLocaleFromPath');
				var locale = that.getLocaleFromPath(file);

				console.log('locale', locale, file);
                var destFile = dest.replace(that.options.localePlaceholder, locale),
                    messages = grunt.file.readJSON(file),
                    translationsMap = {};
                Object.keys(messages).sort().forEach(function (key) {
                    try {
                        var value = messages[key].value;
						translationsMap[key] = value;
                    } catch (e) {
                        return that.logError(e, key, locale, file);
                    }
                });

				var templateString = "module.exports = " + JSON.parse(translationsMap) + ";";

				console.log(templateString);

                grunt.log.writeln('Parsed locales from ' + file.cyan + '.');
				grunt.file.write(destFile, templateString);
                grunt.log.writeln('Updated locale file ' + destFile.cyan + '.');
            });
            this.done();
		};

		console.log('running build', this);

		this.run();
	}

	grunt.registerTask('build', 'Build JS Files', function()
	{
		return new Build(this);
	});
};
