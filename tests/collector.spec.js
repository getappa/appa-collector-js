jest.mock('fs');

const https = require('https');
const collector = require('../src/collector');
const { parse } = require('node-yaml');

const fs = require.requireMock('fs');

describe('src/collector', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should getCollectorName', () => {
        const TASKS = [
            { name: 'mycoll', command: 'test', path: __filename },
            { name: 'mycoll2', command: 'test', path: __dirname },
        ];

        const name = collector.getCollectorName(TASKS, __filename);
        expect(name).toBe(TASKS[0].name);
    });

    it('should #getTag', () => {
        const test = 'test';
        const processor = { collector_tasks: { test, y: 'y' } };

        expect(collector.getTag(test, processor)).toBe(test);
    });

    it('should get val2 in _check', () => {
        const val = 'test';
        expect(collector._check(undefined, val)).toBe(val);
    });

    it('should #Collector', (done) => {
        collector.getParent = jest.fn();
        const fakeConfig = 'config.yml';
        const check = (rawData) => {
            fs.readFileSync.mockReturnValue(rawData);
            const c = collector.Collector.bind({ base: 'tests/mocks/collector2.py' })(fakeConfig);

            expect(c).toHaveProperty('cars');
            expect(c).toHaveProperty('users');
            done();
        }

        https.get('https://rawgit.com/getappa/appa/master/tests/mocks/config1.yml', (res) => {
            let rawData = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => check(rawData));
        });
    });
});