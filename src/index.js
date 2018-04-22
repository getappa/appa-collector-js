module.exports = {
    Collector: require('./collector').Collector.bind({ base: module.parent.filename }),
    Task: require('./task')
};