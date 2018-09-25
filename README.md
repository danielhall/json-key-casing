# JSON Key Casing

This simple Node.js package will convert the casing of the key/element names in your JSON.

The revised version of this package has largely been simplified, as I have taken out all functionality to read and save JSON in files, in favour of seperating out concerns. There are plenty of Node packages that manipulate files.

## Usage

The package exposes one method, called `convert`.

It has three parameters:
1. `jsonString`: String. The original JSON string that you want to convert.
2. `caseName`: String. The name of the casing you want to convert the JSON keys into. See Case Names section below.
3. `prettify`: Bool. The package deconstructs the JSON and builds it again. If this is set to true, the output will be prettified.

### Converting JSON

```javascript

var caseConverter = require('json-key-casing');

var customers = '[{ \'name\': \'Sue\', \'location\': \'UK\' }, { \'name\': \'Mike\', \'location\': \'US\' }]';

Console.Log(caseConverter.convert(customers, 'upper', true));

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