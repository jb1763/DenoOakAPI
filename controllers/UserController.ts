import { UserType, ContactInfoType } from "../types/schemaTypes.ts";

let Users: Array<UserType>= [{
    uid: '1',
    firstName: 'Bob',
    lastName: 'Jones',
    birthDate: '07-21-1993',
}];

const ContactInfo: Array<ContactInfoType> = [
    {
        contactId: '101',
        uid_fk: '1',
        email: 'bobjones@emaple.com',
        phone: '1-717-555-5555',
    }
];

let nextUID = 2;

const findUserById = (uid: string): Array<UserType> => {
    return Users.filter(user => user.uid === uid)
}


export const getUsers = ({ response }: {response: any}) => {
    response.body = Users
};

export const getUser = ({params, response}: {params: {uid: string}, response: any}) => {
    const user = findUserById(params.uid)
    if (user.length > 0) {
        response.status = 200;
        response.body = user[0];
    } else {
        response.status = 404;
        response.body = {msg:`Cannot find user with id ${params.uid}`}
    }
}

export const createUser = async ({request, response}: {request: any, response: any}) => {
    if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: "Invalid user data" };
        return;
    }
    const body = await request.body();
    const user: UserType = JSON.parse(body.value);
    user['uid'] = `${nextUID}`;
    nextUID++;
    Users.push(user);
    console.log(Users)

    response.body = { message: 'OK' };
    response.status = 200;
}

export const updateUser = async ({params, request, response}: {params:{uid: string}, request: any, response: any}) => {
    let findUser = findUserById(params.uid);
    if (findUser.length > 0) {
        let user: UserType = findUser[0];
        const body = await request.body();
        const userUpdateInfo: UserType = JSON.parse(body.value);
        user = { ...user, ...userUpdateInfo};
        Users = [...Users.filter(user => user.uid !== params.uid), user]
        response.status = 200;
        response.body = {msg:'OK'}
    } else {
        response.status = 404;
        response.body = {msg:`Cannot find user with id ${params.uid}`}
    }
}

// TODO Also delete associated contact info
export const deleteUser = ({params, response}: { params: {uid :string }, response: any}) => {
    Users = Users.filter(user => user.uid !== params.uid);
    response.status = 200;
    response.body = {msg:'OK'}
}
