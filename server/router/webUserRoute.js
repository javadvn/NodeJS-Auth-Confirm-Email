const expres = require('express');
const { webUserController } = require('../controller/webUserController');

const webUserRoutes = expres.Router();



webUserRoutes.post('/register', webUserController.register)
webUserRoutes.post('/confirm', webUserController.confirm)
webUserRoutes.post('/login', webUserController.login)
webUserRoutes.post('/token', webUserController.token)








module.exports = {
    webUserRoutes
}