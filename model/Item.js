const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapters = new fs("db.json");
const db = low(adapters);

const Item = {};

Item.getAll = (callback) => {
    const items =db.get('items').value();
    callback(items);
};

Item.getById = (id, callback) => {
    db.get('items').find({ id: id });
    
    const items = db.get('items').value();
    callback(items);
}

Item.postItem = (item, callback) => {
    db.get('items').push({ id: db.get('items').value().length + 1, ...item}).write();
    
    const items = db.get('items').value();
    callback(items);
};



Item.updateItem = (id, updatedItem) => db.get('items').find({ id: id}).assign(updatedItem).write();


Item.deleteItem = (id) => db.get('items').remove({ id: id }).write();


module.exports = Item;
