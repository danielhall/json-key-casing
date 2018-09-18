// unitTests.js
// =============

var jsonKeyCasing = require('../app/jsonKeyCasing');

describe("Given valid json for conversion", function () {
    it('should convert to upper case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "NAME": "Joe", "CURRENT AGE": "40", "CURRENT LOCATION": "London", "TYPE": "Human", "REQUIRED": ["NAME", "CURRENT LOCATION"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'upper',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });

    it('should convert to lower case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "name": "Joe", "current age": "40", "current location": "London", "type": "Human", "required": ["name", "current location"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'lower',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });

    it('should convert to pascal case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "name": "Joe", "currentAge": "40", "currentLocation": "London", "type": "Human", "required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'pascal',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });

    it('should convert to camel case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "name": "Joe", "currentAge": "40", "currentLocation": "London", "type": "Human", "required": ["name", "currentLocation"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'camel',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });

    it('should convert to kebab case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "name": "Joe", "current-age": "40", "current-location": "London", "type": "Human", "required": ["name", "current-location"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'kebab',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });

    it('should convert to constant case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "NAME": "Joe", "CURRENT_AGE": "40", "CURRENT_LOCATION": "London", "TYPE": "Human", "REQUIRED": ["NAME", "CURRENT_LOCATION"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'constant',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });


    it('should convert to title case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "Name": "Joe", "Current Age": "40", "Current Location": "London", "Type": "Human", "Required": ["Name", "Current Location"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'title',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });

    it('should convert to capital case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "Name": "Joe", "Current Age": "40", "Current Location": "London", "Type": "Human", "Required": ["Name", "Current Location"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'capital',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });

    it('should convert to sentence case', function (done) {
        // Arrange
        var initialJson = JSON.stringify({ "Name": "Joe", "CurrentAge": "40", "CurrentLocation": "London", "Type": "Human", "Required": ["Name", "CurrentLocation"] }, null, 4);
        var expectedResult = JSON.stringify({ "Name": "Joe", "Current age": "40", "Current location": "London", "Type": "Human", "Required": ["Name", "Current location"] }, null, 4);

        // Act
        var returnedValue = jsonKeyCasing.convert(initialJson, 'sentence',
            {
                prettifyOutput: true
            });

        // Assert
        expect(returnedValue).toBe(expectedResult);
        done();
    });
});