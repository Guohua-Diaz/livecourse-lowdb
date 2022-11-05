const Item  = require('../model/Item');

const getAllItems = (req, res) => {
    Item.getAll((results) => {
        if(!results) {
            res.send("Error retrieving all items")
        }
        res.send(results);
    })
};

const postItem = (req, res, next) => {
    const item = req.body;
   
    Item.postItem(item, (results)=> {
        req.item = results
        next();
    })
};

const getItemById =(req, res) => {
    let id = isNaN(+req.params.id) ? req.item.id : Number(req.params.id)
    Item.getById(id, (results) => {
        if(!results) {
            res.send("Error retrieving item")
        }
        res.send(results)
    });
}

const updateItem = (req, res) => {
    const id = Number(req.params.id);
    const updatedItem = req.body;
    
    Item.updateItem(id, updatedItem);
    
    res.send(`Your item with an id of ${id} has been successfully updated!`)
};

const deleteItem =  (req, res) => {
    const id = Number(req.params.id);
    Item.deleteItem(id);
    res.send(`Your item with an id of ${id} has been successfully deleted!`);
};

module.exports = { getAllItems, postItem, updateItem, deleteItem, getItemById };