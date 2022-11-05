const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

// const setCookie = (req, res, next) => {
//     res.status(200).cookie("login", true).send("Cookie created");
//     next();
// }

// const authenticationMiddleware = (req, res, next) => {
//     if(req.cookies.login === true) {
//         console.log("user is logged in");
//         // next();
//     } else {
//         res.status(403).send("unauthorized");
//     }
// };

const createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    User.createUser(req.body.email, hashedPassword);
    res.sendStatus(201);
};


const loginUser = async (req, res) => {
    const user = User.loginUser(req.body.email);
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(req.body.email === user.email && validPassword) {
        const token = jwt.sign({id: user.id}, "mySecret");
        res.status(200).cookie('token',token).send('Welcome!');
    } else {
        res.status(401).send('Wrong password or email');
    }
};

const authenticationMiddleware = (req, res, next) => {
  if(!req.cookies.token) {
    console.log('User does not have any token');
    res.sendStatus(403)
  } else {
    jwt.verify(req.cookies.token, 'mySecret', (error, decoded)=>{
        if (error) {
            res.status(403).send('An error occured')
        } else {
           req.userId = decoded.id;
           next();
        }
    });
  }
};

const welcomeUser = (req, res) => {
    console.log('userId from previous middleware:', req.userId)
    res.send('Welcome to the secret route!');
}

module.exports = { createUser, loginUser, authenticationMiddleware, welcomeUser };