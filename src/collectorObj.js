module.exports = class CollectorObj {
    constructor(tag) {
        this.tag = tag;
    }

    send(data) {
        if (Array.isArray(data) && this.schema) {
            data = data.map(this.schema);
        } else if (typeof data === 'object' && this.schema) {
            data = this.schema(data);
        }

        const pdata = JSON.stringify(data);
        process.stdout.write(`!AppaTag(${this.tag})${pdata}`);
    }

    addSchema(schema) {
        this.schema = schema;
    }
};