const CollectorObj = require('../src/collectorObj');

const fakeTag = 'test'
const fakeSchema = (data) => ({ x: data.x * 2 });
const template = data => `!AppaTag(${fakeTag})${data}`

describe('src/collectorObj', () => {
    let collector;
    const fakeData = { x: 1 };

    beforeEach(() => {
        process.stdout.write = jest.fn();
        collector = new CollectorObj(fakeTag);
    });

    it('should send a simple array', () => {
        const resp = JSON.stringify([fakeData]);
        collector.send([fakeData]);
        expect(process.stdout.write).toHaveBeenCalledWith(template([resp]));
    });

    it('should send a simple object', () => {
        const resp = JSON.stringify(fakeData);
        collector.send(fakeData);
        expect(process.stdout.write).toHaveBeenCalledWith(template(resp));
    });

    it('should send a simple array with schema', () => {
        const resp = JSON.stringify([fakeSchema(fakeData)]);
        collector.addSchema(fakeSchema);
        collector.send([fakeData]);
        expect(process.stdout.write).toHaveBeenCalledWith(template([resp]));
    });

    it('should send a simple object with schema', () => {
        const resp = JSON.stringify(fakeSchema(fakeData));
        collector.addSchema(fakeSchema);
        collector.send(fakeData);
        expect(process.stdout.write).toHaveBeenCalledWith(template(resp));
    });
});