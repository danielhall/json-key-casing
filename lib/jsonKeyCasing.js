'use strict';

/**
 * Module dependencies
 */
var fs = require('fs');

/**
 * Helper to convert the key casing of a single file.
 */
function convertSingleJsonFileKeyCasing(filePath, caseName, callback) {
  fs.readFile(filePath, 'utf8', function(error, contents) {
    if (error) {
      return callback(false, error);
    }

    // UNDER DEVELOPMENT. Only work with camel casing for now.
    // Convert the key casing
    var newContents = JSON.stringify(JSON.parse(contents, camelConverter), null, 4);

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
 * Convert to camelCase
 */
function camelConverter(key, val) {
	if (key) {
        this[key.charAt(0).toLowerCase() + key.slice(1)] = val;
    }
    else {
        return val;
    }
}

/**
 * Json Key Casing helper
 */
module.exports = function convertJsonKeyCasing(config, callback) {
  callback = callback || function() {};

  //No file array given? Then create one
  if (!Array.isArray(config.files)) {
    config.files = [config.files];
    return convertJsonKeyCasing(config, callback);
  }

  //Initialize helper vars
  var totalFiles = config.files.length;
  var processedFiles = 0;
  var changedFiles = [];

  //Convert each file
 config.files.forEach(function(file) {
    convertSingleJsonFileKeyCasing(file, config.caseName, function(success, error) {
        if (error) {
            return callback(false, error);
        }

        changedFiles.push(file);
        processedFiles++;

        if (processedFiles === totalFiles) {
            callback(true, null);
        }
    });
  });
}