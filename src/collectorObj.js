module.exports = class CollectorObj {
    constructor(tag) {
        this.tag = tag;
    }

    send(data) {
        if (Array.isArray(data) && this.schema) {
            data = data.map(this.schema);
        } else if (!Array.isArray(data) && typeof data === 'object') {
            data = [this.schema ? this.schema(data) : data];
        }

        const pdata = JSON.stringify(data);
        process.stdout.write(`!AppaTag(${this.tag})${pdata}\n`);
    }

    addSchema(schema) {
        this.schema = schema;
    }
};