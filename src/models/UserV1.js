/*  organisation = fields.Nested(OrganisationSchema, dump_only=True)
    credential = fields.Nested(CredentialSchema, dump_only=True) */

export class User {
    constructor({
        uuid = ``,
        createdAt = null,
        updatedAt = null,
        username = ``,
        emailAddress = ``,
        firstName = ``,
        lastName = ``,
        phoneNumber = ``,
        preferredLanguange = `en_US`,
        registeredAt = null,
        organisationUuid = ``
    } = {}) {
        this.uuid = uuid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.username = username;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.preferredLanguange = preferredLanguange;
        this.registeredAt = registeredAt;
        this.organisationUuid = organisationUuid;
    }
}

export function immutableUser(data) {
    return Object.freeze(new User(data))
}