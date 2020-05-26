export type UserType = {
    uid : string, 
    firstName: string,
    lastName: string,
    // Decide on string or DateTime
    birthDate: any,
}

export type ContactInfoType = {
    contactId: string,
    uid_fk: string,
    email: string,
    phone: string,
}