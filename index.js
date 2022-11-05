const express = require("express");
const app = express();
const serverPort = 8000;
const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapters = new fs("db.json");
const db = low(adapters);
const itemsRouter = require('./routes/items-route');
const authRouter = require('./routes/auth-route');
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());

db.defaults({ items: [], users: [] }).write();

app.use('/items', itemsRouter);

app.use('/auth', authRouter)


app.listen(serverPort, () => {
    console.log(`Express server is running on port ${serverPort}`);
})