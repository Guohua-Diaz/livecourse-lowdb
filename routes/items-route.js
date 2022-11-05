const express = require('express');
const router = express.Router();
const { getAllItems, postItem, updateItem, deleteItem, getItemById } = require('../controllers/items-controller');

router.get('/', getAllItems);

router.post('/', postItem, getItemById);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;