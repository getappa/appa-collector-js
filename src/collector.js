const CollectorObj = require('./collectorObj');

const { readFileSync } = require('fs');
const { parse } = require('node-yaml');
const { join } = require('path');

exports.getCollectorName = (tasks, search) => {
    return tasks.filter((task) => {
        return ~search.indexOf(task.path);
    })[0].name;
};

exports.getTag = (collectorName, processor) => {
    return processor['collector_tasks'][collectorName];
};

exports._check = (val1, val2) => {
    return val1 || val2;
}

exports.Collector = function (configFile) {
    const parentName = exports._check(this.base, module.parent.filename);
    const collector = {};
    const path = join(process.cwd(), configFile);
    const { tasks, processors } = parse(readFileSync(path));
    const collectorName = exports.getCollectorName(tasks, parentName);

    processors.forEach(p => {
        const tag = exports.getTag(collectorName, p);

        /* istanbul ignore else */
        if (tag) {
            collector[p.name] = new CollectorObj(tag);
        }
    });

    return collector;
};
