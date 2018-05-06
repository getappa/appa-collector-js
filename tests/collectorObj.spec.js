const CollectorObj = require('../src/collectorObj');

const fakeTag = 'test'
const fakeSchema = (data) => ({ x: data.x * 2 });
const template = data => `!AppaTag(${fakeTag})[${data}]\n`

describe('src/collectorObj', () => {
    let collector;
    const fakeData = { x: 1 };
    const resp = JSON.stringify(fakeData);
    const respSchema = JSON.stringify(fakeSchema(fakeData));

    beforeEach(() => {
        process.stdout.write = jest.fn();
        collector = new CollectorObj(fakeTag);
    });

    const testFor = (input, output) => {
        collector.send(input);
        expect(process.stdout.write).toHaveBeenCalledWith(template(output));
    }

    it('should send a simple array', () => {
        testFor([fakeData], resp);
    });

    it('should send a simple object', () => {
        testFor(fakeData, resp);
    });

    it('should send a simple array with schema', () => {
        collector.addSchema(fakeSchema);
        testFor([fakeData], respSchema);
    });

    it('should send a simple object with schema', () => {
        collector.addSchema(fakeSchema);
        testFor(fakeData, respSchema);
    });
});