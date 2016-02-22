'use strict';

/**
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');
var caseConverter = require('case');
var convertRequiredArrayItems;

/**
 * Convert the key casing of a single file.
 */
function convertSingleJsonFileKeyCasing(filePath, caseName, callback) {
	// Read the file.
    fs.readFile(filePath, 'utf8', function(error, contents) {
        if (error) {
            return callback(false, error);
        }

        // Convert the key casing
        var newContents = JSON.stringify(iterateObject(JSON.parse(contents), caseName), null, 4);

        //Write to file
        fs.writeFile(filePath, newContents, 'utf8', function(error) {
            if (error) {
                return callback(false, error);
            }
            callback(true, null);
        });
    });
}

/**
 * Iterate a given object and change the casing on any properties.
 */
function iterateObject(obj, caseName, objName) {
    var object;

	// Check whether the object is an array.
	// If it is, then build an array and change re-call this function for any nested objects.
	// If it isn't, deal with this object, and then re-call this function for any nested objects.
    if (Object.prototype.toString.call(obj) === '[object Array]') {
		// We're currently working with an ARRAY.
		
		// Create our new working array.
        object = [];

		// Loop through array items
        for (var i = 0; i < obj.length; i++) {
            var item = obj[i];

			// If the array item is an object, then re-call this function to iterate that object and change casing.
            if (typeof item == 'object') {
                item = iterateObject(item, caseName);
            } 
			// If the current item is a string, and we know the array name is 'required',
			// treat this as a key name.
			else if (typeof item == 'string' 
						&& convertRequiredArrayItems 
						&& objName 
						&& objName.toLowerCase() == 'required') {
				item = changeCase(item, caseName);
			}

			// Push the case-modified item to our new array.
            object.push(item);
        }
    } else {
		// We're currently working with an OBJECT.
		
		// Create our new working object.
        object = {};

		// Loop through the properties on this object and change the case.
        for (var property in obj) {
			
			// If the value of the property is another object, re-call this function and change the case.
            if (typeof obj[property] == 'object') {
                obj[property] = iterateObject(obj[property], caseName, property);
            }

			// Change the case of the key of the current property.
            object[changeCase(property, caseName)] = obj[property];
        }
    }

	// Return the object created during this iteration.
    return object;
}

/**
 * Change the case of the specified string.
 */
function changeCase(string, caseName) {
    // Convert the case
	// Uses the Node package 'Case'.
	// https://www.npmjs.com/package/case
    if (caseName == 'upper') {
        return caseConverter.upper(string);
    } else if (caseName == 'lower') {
        return caseConverter.lower(string);
    } else if (caseName == 'snake') {
        return caseConverter.snake(string);
    } else if (caseName == 'pascal') {
        return caseConverter.pascal(string);
    } else if (caseName == 'camel') {
        return caseConverter.camel(string);
    } else if (caseName == 'kebab') {
        return caseConverter.kebab(string);
    } else if (caseName == 'constant') {
        return caseConverter.constant(string);
    } else if (caseName == 'title') {
        return caseConverter.title(string);
    } else if (caseName == 'capital') {
        return caseConverter.capital(string);
    } else if (caseName == 'sentence') {
        return caseConverter.sentence(string);
    } else {
        return string;
    }
}

function findInDirectory(directoryPath, searchSubdirectories, callback){
	var fileNames = [];
	var filter = '.json'

	// Check if the directory exists
    if (!fs.existsSync(directoryPath)){
        callback(false, 'Directory provided does not exist.');
        return;
    }

	// Get the files in the directory
    var files = fs.readdirSync(directoryPath);
	
	// Loop through the files
    for(var i = 0; i < files.length; i++){
		// Get the file name
        var filename = path.join(directoryPath, files[i]);
		
        var stat = fs.lstatSync(filename);
		
		// If we find a sub-directory, check if the user wants to search sub-directories.
		// If they do, call this function again.
        if (stat.isDirectory() && searchSubdirectories == true){
			// Call this function again.
            var filesFound = findInDirectory(filename, searchSubdirectories, callback);
			
			for(var i = 0; i < filesFound.length; i++){
				fileNames.push(filesFound[i]);
			}
        }
        else if (filename.indexOf(filter) >= 0) {
            fileNames.push(filename);
        };
    };
	
	return fileNames;
};


/**
 * Main function. Parse config and kick-off logic.
 */
module.exports = function convertJsonKeyCasing(config, callback) {
    callback = callback || function() {};

	var files = [];
	
	convertRequiredArrayItems = config.convertRequiredArray;
	
	// If the user has specified an array of files, or single file...
	if (config.files)
	{
		// No file array given? Then create one.
		if (Array.isArray(config.files)) {
			files = config.files;
		} else {
			files.push(config.files);
		}
	}
	
	// If the user has specified a directory containing JSON files 
	if (config.directory)
	{
		// Find all of the JSON files in the directory
		var filesFound = findInDirectory(config.directory, config.searchSubdirectories, callback);
		
		for(var i = 0; i < filesFound.length; i++){
			files.push(filesFound[i]);
		}
	}

    // Initialize helper vars.
    var totalFiles = files.length;
    var processedFiles = 0;
    var changedFiles = [];
	
    // Convert each file.
    files.forEach(function(file) {
		// Convert the file and setup the callback.
        convertSingleJsonFileKeyCasing(file, config.caseName, function(success, error) {
			// Callback function.
			
			// If there has been an error, return the error in the callback to the user.
            if (error) {
                return callback(false, error);
            }

            changedFiles.push(file);
            processedFiles++;

			// If all files are converted, then success.
            if (processedFiles === totalFiles) {
                callback(true, null);
            }
        });
    });
}