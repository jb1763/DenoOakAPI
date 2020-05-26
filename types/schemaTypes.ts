export type UserType = {
    uid : string, 
    firstName: string,
    lastName: string,
    // Decide on string or DateTime
    birthDate: any,
    deleted?: boolean,
}

export type ContactInfoType = {
    contactId: string,
    uid_fk: string,
    email: Array<string>,
    phone: Array<string>,
    deleted?: boolean,
}