const getKnex = require('../../lib/db-connection');
const md5 = require('md5');
const TABLE = 'users';

const Users = () => getKnex(TABLE)

const login = async(username, password) => {
    return await Users().select().where('username', username).andWhere('password', md5(password)).first();
}

const getUser = async(userId) => {
    return await Users().where('userId', userId);
}

const getUserByUserName = async(username) => {
    if (!username) return null;

    return await Users().where('username', username);
}

const createUser = async(username, password, firstName, lastName) => {
    let userExists = await getUserByUserName(username);

    if (userExists) throw new Error('Aleardy a user exists with the user name, please use a different username');

    let passwordHash = md5(password);

    return await Users().insert({
        username,
        password: passwordHash,
        firstName,
        lastName
    });
}

module.exports = { login, createUser, getUser }