const assert = require('assert');
const parseMessage = require('../lib/parse-message');

describe('parseMessage tests', () => {

    it('ignores strings that do not start with @', () => {

        let response = parseMessage('I do not have an @ sign at my beginning');
        assert.equal(response, null);
    });

    it('returns an object if the string begins with @', () => {

        let response = parseMessage('@cmd:param some text');
        let expected = {
            command: 'cmd',
            arg: 'param',
            text: 'some text'
        };
        assert.deepEqual(response, expected);
    });


});

