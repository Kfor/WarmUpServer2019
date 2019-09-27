const userController = require('./controller/user');
const upStreamUserController = require('./controller/upStreamUser');
const downStreamUserController = require('./controller/downStreamUser');
const middleStreamUserController = require('./controller/middleStreamUser');


module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/test', userController.test)

    .post('/user/login', userController.login)
    .post('/user/register', userController.register)
    .post('/user/logout', userController.logout)

    
    .post('/upstream/invest', upStreamUserController.invest)
    .post('/upstream/produce', upStreamUserController.produce)
    .post('/upstream/clear', upStreamUserController.clear)
    .post('/upstream/debt', upStreamUserController.debt)

    .post('/middlestream/invest', middleStreamUserController.invest)
    .post('/middlestream/produce', middleStreamUserController.produce)
    .post('/middlestream/clear', middleStreamUserController.clear)
    .post('/middlestream/debt', middleStreamUserController.debt)

    .post('/downstream/advertise', downStreamUserController.advertise)
    .post('/downstream/sell', downStreamUserController.sell)
    .post('/downstream/clear', downStreamUserController.clear)
    .post('/downstream/debt', downStreamUserController.debt)
    .post('/downstream/init', downStreamUserController.init)
    ;
};
