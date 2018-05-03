const stdout = (data, isObj = false) => {
    const response = isObj ? JSON.stringify(data) : data;
    process.stdout.write(response);
};

module.exports = (callback) => {
    const strData = process.argv[2] || '{}';
    const data = JSON.parse(strData);

    let response = callback(data);

    if (typeof response === 'object' && response.then) {
        return response.then((data) => stdout(data, typeof data === 'object'));
    } else if (typeof response === 'object') {
        return stdout(response, true);
    }

    return stdout(response);
};