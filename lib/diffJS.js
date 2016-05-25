/*jslint regexp: true, unparam: true, nomen: true */
/*global module, require, global, __dirname */
module.exports = function(taskManager)
{
	var dest = taskManager.getFilePath('dest');
	var diff = taskManager.getFilePath('diff');
	taskManager.getSourceFiles().forEach(function(file)
	{
		var locale = taskManager.getLocaleFromPath(file);
		var destFile = dest.replace(taskManager.options.localePlaceholder, locale);
		var diffFile = diff.replace(taskManager.options.localePlaceholder, locale);

		var srcRawFile = taskManager.grunt.file.read(file);
			srcRawFile = srcRawFile.replace(/[^{]*/, ''); //.replace(/ /g, '_').replace(/":[_]*"/g, '":"');

		var srcObject = JSON.parse(srcRawFile);

		var diffRawFile = taskManager.grunt.file.read(diffFile);
			diffRawFile = diffRawFile.replace(/[^{]*/, ''); //.replace(/ /g, '_').replace(/":[_]*"/g, '":"');

		var diffObject = JSON.parse(diffRawFile);

		var translationsMap = {};
		Object.keys(srcObject).sort().forEach(function (key)
		{
			if(diffObject[key] === undefined)
			{
				translationsMap['(+) ' + key] = key;
			}
		});

		Object.keys(diffObject).sort().forEach(function (key)
		{
			if(srcObject[key] === undefined)
			{
				translationsMap['(-) ' + key] = key;
			}
		});

		var templateString = JSON.stringify(translationsMap);
			templateString = templateString.replace(/","/g, '",\n\t"').replace(/":"/g, '": "').replace(/{/, '{\n\t').replace(/}/, '\n}');

		taskManager.grunt.log.writeln('Parsed locales from ' + file.cyan + '.');
		taskManager.grunt.file.write(destFile, templateString);
		taskManager.grunt.log.writeln('Created locale file ' + destFile.cyan + '.');
	});

	taskManager.done();
};
