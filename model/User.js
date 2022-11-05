const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapters = new fs("db.json");
const db = low(adapters);

const User = {};

User.createUser = (email, password) => {
    return db.get('users').push({ 
        id: db.get('users').value().length + 1,
        email,
        password
    }).write();
};

User.loginUser = (email) => db.get('users').find({email}).value();

User.deleteItem = (id) => db.get('users').remove({ id: id }).write();

module.exports = User;