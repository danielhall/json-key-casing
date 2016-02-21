var demo = require('json-key-casing');

demo({
	files: [ 'ExampleJsonFiles/jsonExampleOne.json' ],
	directory: './ExampleJsonFiles/DirectoryForTesting',
	searchSubdirectories: true,
	caseName: 'camel'
}, function(success, error) {
	console.log('Success: ' + success);
	console.log('Error: ' + JSON.stringify(error));
});