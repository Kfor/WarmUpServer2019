const userController = require('./controller/user');
const downStreamUserController = require('./controller/downStreamUser');
const upStreamUserController = require('./controller/upStreamUser')

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/test', userController.test)

    .post('/user/login', userController.login)
    .post('/user/register', userController.register)
    .post('/user/logout', userController.logout)

    .post('/upstream/produce', upStreamUserController.produce)
    .post('/processOneTurnSell',downStreamUserController.produce)
    ;
};
