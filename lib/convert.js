'use strict';

var jsonHelper = require('./jsonHelper');

/*
    Welcome to jsonKeyCasing; small project by @Daniel__JH (danieljohnhall.co.uk).
    This app will change the casing of json field names either from a file, or from a specified string.
    View the readme file for documentation.
 */

module.exports.convert = function (jsonString, caseName, options) {

    if (!options) {
        options = {};
    }

    // input can either be json, or a file.
    if (!jsonHelper.isJSON(jsonString)) {
        console.log('Input is not a valid JSON.');
        return jsonString;
    }

    var jsonOutput = jsonHelper.convert(jsonString, caseName);
    jsonString = jsonHelper.stringify(jsonOutput, options.prettifyOutput);

    return jsonString;
}