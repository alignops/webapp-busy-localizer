## busybusy localizer

The purpose of this localizer is to parse the busybusy app and append all the strings to a file that can be translated.

### INSTALL

Installation of the busybusy localizer depends on `nodejs` and `npm`.

Run the following commands to install the node packages:
```
npm install -g grunt
npm install
```

### HOW TO USE

The command can be ran in the root folder with **grunt locales:update**

In **Gruntfile.js** the destination of the file created can be specified under *locales-update-dest*

### CONTRIBUTIONS

This projects base code came from a grunt file parser, the url of the grunt project is 

[ https://www.npmjs.com/package/grunt-locales ](https://www.npmjs.com/package/grunt-locales)
