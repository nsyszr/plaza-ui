export class Organisation {
    constructor({
        uuid = ``,
        createdAt = null,
        updatedAt = null,
        name = ``,
        roles = [],
        supplierUuid = ``,
        emailAddress = ``,
        customerNumber = ``,
        vatNumber = ``,
        phoneNumber = ``,
        address1 = ``,
        address2 = ``,
        postalCode = ``,
        city = ``,
        state = ``,
        countryCode = ``,
        validated = false
    } = {}) {
        this.uuid = uuid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this.roles = roles;
        this.supplierUuid = supplierUuid;
        this.emailAddress = emailAddress;
        this.customerNumber = customerNumber;
        this.vatNumber = vatNumber;
        this.phoneNumber = phoneNumber;
        this.address1 = address1;
        this.address2 = address2;
        this.postalCode = postalCode;
        this.city = city;
        this.state = state;
        this.countryCode = countryCode;
        this.validated = validated;
    }
}

export function immutableOrganisation(data) {
    return Object.freeze(new Organisation(data))
}