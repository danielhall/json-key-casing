'use strict';

var processor = require('./jsonKeyCasing');

// Run the unit tests


// Run a few manual times
var string = processor.convert("{ \"Key\": \"Value\" }", "lower",
    {
        prettifyOutput: true
    });

console.log(string);

processor.convertFile("C:\\Users\\Daniel\\Desktop\\testJsonFile.json", "title",
    {
        prettifyOutput: true,
        overwriteInputFile: true,
        fileEncoding: "utf8",
        onComplete: function(error, output) {
            console.log(output);
        }
    });