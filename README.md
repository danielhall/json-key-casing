# JSON Key Casing

This Node.js package is designed to iterate through multiple JSON files (or an entire directory of JSON files), and change the casing of all keys in each file.

## Usage

This package can be used to convert the cases on a single file, multiple array of files, or directory of files. Examples on how to achieve each of these are detailed below.

### Single File

```javascript
var jsonKeyCasing = require('json-key-casing');

jsonKeyCasing({
	files: 'json/sample.json', // A single path can be provided.
	caseName: 'camel', // Specify the name of the case you want the file keys to be converted to.
    convertRequiredArray: true // If you're converting JSON schema, you may want to change the case of the string values in the 'required' array, as these are key names.
}, function(success, error) {
    // Callback function supported.
	console.log('Success: ' + success);
	console.log('Error: ' + JSON.stringify(error));
});
```

### Multiple Array of Files

```javascript
var jsonKeyCasing = require('json-key-casing');

jsonKeyCasing({
	files: ['json/sample.json', 'elsewhere/sample2.json'], // An array of files can be provided.
	caseName: 'pascal',
    convertRequiredArray: false
}, function(success, error) {
    // Callback function supported.
	console.log('Success: ' + success);
	console.log('Error: ' + JSON.stringify(error));
});
```

### Single Directory of Files

```javascript
var jsonKeyCasing = require('json-key-casing');

jsonKeyCasing({
	directory: './JsonFiles/Examples', // A directory path can be provided. Any .json file in here will be converted.
    searchSubdirectories: true, // If you want the app to convert files in sub-directories, use this.
	caseName: 'pascal',
    convertRequiredArray: false
}, function(success, error) {
    // Callback function supported.
	console.log('Success: ' + success);
	console.log('Error: ' + JSON.stringify(error));
});
```

## Case Names

I'm using the 'Case' Node package to convert the cases. This is found at https://www.npmjs.com/package/case.

The app currently supports the following case names:
* upper
* lower
* snake
* pascal
* camel
* kebab
* constant
* title
* capital
* sentence

## Warning

This app will edit the files you provide under the given directory name or file paths. You may want to create a copy of these files as a backup, before you run the app, incase you need to revert to the original.