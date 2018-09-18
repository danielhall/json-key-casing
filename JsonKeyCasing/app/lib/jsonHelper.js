// jsonHelper.js
// =============

var caseConverter = require('case');

module.exports = {
    isJSON: function(input) {
        try {
            JSON.parse(input);
        } catch (e) {
            return false;
        }
        return true;
    },
    convert: function (input, caseName) {
        return iterateObject(JSON.parse(input), caseName);
    },
    stringify: function (input, prettify) {
        if (prettify) {
            return JSON.stringify(input, null, 4);
        }

        return JSON.stringify(input);
    }
};

/**
 * Iterate a given object and change the casing on any properties.
 */
function iterateObject(obj, caseName, objName) {
    var object;

    // Check whether the object is an array.
    // If it is, then build an array and re-call this function for any nested objects.
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
                && objName
                && objName.toLowerCase() === 'required') {
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
            if (obj.hasOwnProperty(property)) {

                // If the value of the property is another object, re-call this function and change the case.
                if (typeof obj[property] == 'object') {
                    obj[property] = iterateObject(obj[property], caseName, property);
                }

                // Change the case of the key of the current property.
                object[changeCase(property, caseName)] = obj[property];
            }
        }
    }

    // Return the object created during this iteration.
    return object;
}

/**
 * Change the case of the specified string.
 */
function changeCase(inputString, caseName) {
    // Convert the case
    // Uses the Node package 'Case'.
    // https://www.npmjs.com/package/case
    if (caseName === 'upper') {
        return caseConverter.upper(inputString);
    } else if (caseName === 'lower') {
        return caseConverter.lower(inputString);
    } else if (caseName === 'snake') {
        return caseConverter.snake(inputString);
    } else if (caseName === 'pascal') {
        return caseConverter.pascal(inputString);
    } else if (caseName === 'camel') {
        return caseConverter.camel(inputString);
    } else if (caseName === 'kebab') {
        return caseConverter.kebab(inputString);
    } else if (caseName === 'constant') {
        return caseConverter.constant(inputString);
    } else if (caseName === 'title') {
        return caseConverter.title(inputString);
    } else if (caseName === 'capital') {
        return caseConverter.capital(inputString);
    } else if (caseName === 'sentence') {
        return caseConverter.sentence(inputString);
    } else {
        return inputString;
    }
}