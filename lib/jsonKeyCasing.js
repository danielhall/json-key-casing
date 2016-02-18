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
      return callback(error);
    }

    // UNDER DEVELOPMENT. Only work with camel casing for now.
    // Convert the key casing
    var newContents = JSON.stringify(contents, function (key, value) {
        if (value && typeof value === 'object') {
            var replacement = {};
            for (var k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                    replacement[k && k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                }
            }
            return replacement;
        }
        return value;
    });

    //Write to file
    fs.writeFile(filePath, newContents, 'utf8', function(error) {
      if (error) {
        return callback(error);
      }
      callback(null);
    });
  });
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

  //Replace each file
  config.files.forEach(function(file) {
    convertSingleJsonFileKeyCasing(file, config.caseName, function(error) {
      if (error) {
        return callback(error);
      }
      
      changedFiles.push(file);
      processedFiles++;
      
      if (processedFiles === totalFiles) {
        callback(null, changedFiles);
      }
    });
  });
}