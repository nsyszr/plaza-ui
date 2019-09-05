/*  organisation = fields.Nested(OrganisationSchema, dump_only=True)
    credential = fields.Nested(CredentialSchema, dump_only=True) */

export class Device {
    constructor({
        uuid = ``,
        createdAt = null,
        updatedAt = null,
        family = ``,
        name = ``,
        location = ``,
        serialNumber = ``,
        status = ``,
        details = null,
        session = null
    } = {}) {
        this.uuid = uuid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.family = family;
        this.name = name;
        this.location = location;
        this.serialNumber = serialNumber;
        this.status = status;
        this.details = details;
        this.session = session;
    }
}

export function immutableDevice(data) {
    return Object.freeze(new Device(data))
}