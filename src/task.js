module.exports = (callback) => {
    const strData = process.argv[2] || '{}';
    const data = JSON.parse(strData);

    const response = callback(data);

    if (typeof response === 'object') {
        process.stdout.write(JSON.stringify(response));
    }

    process.stdout.write(response);
};