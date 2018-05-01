const Task = require('../src/task');

describe('src/task', () => {
    beforeEach(() => {
        process.argv[2] = undefined;
        process.stdout.write = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should run Task for json response', () => {
        const fakeData = { foo: 'bar' };
        Task(() => fakeData);
        expect(process.stdout.write).toHaveBeenCalledWith(
            JSON.stringify(fakeData)
        );
    });

    it('should run Task for promise response', () => {
        const fakeData = 'fakedata';
        const task = Task(() => Promise.resolve(fakeData));

        return task.then(() => {
            expect(process.stdout.write).toHaveBeenCalledWith(fakeData);
        })
    });

    it('should run Task for non json response', () => {
        const fakeData = 'foobar';
        Task(() => fakeData);
        expect(process.stdout.write).toHaveBeenCalledWith(fakeData);
    });
});