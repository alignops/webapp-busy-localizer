
/*jslint regexp: true, unparam: true, nomen: true */
/*global module, require, global, __dirname */
module.exports = function(taskManager)
{
    var dest = taskManager.getFilePath('dest');
    taskManager.getSourceFiles().forEach(function(file)
	{
		var locale = taskManager.getLocaleFromPath(file);
        var destFile = dest.replace(taskManager.options.localePlaceholder, locale);
        var messages = taskManager.grunt.file.readJSON(file);
        var translationsMap = {};
        Object.keys(messages).sort().forEach(function (key)
		{
            var value = messages[key].value;
			translationsMap[key] = value;
        });

		var templateString = JSON.stringify(translationsMap);
			templateString = templateString.replace(/","/g, '",\n\t"').replace(/:/g, ': ').replace(/{/, '{\n\t').replace(/}/, '\n}');

		taskManager.grunt.log.writeln('Parsed locales from ' + file.cyan + '.');
		taskManager.grunt.file.write(destFile, templateString);
        taskManager.grunt.log.writeln('Created locale file ' + destFile.cyan + '.');
    });

    taskManager.done();
};
