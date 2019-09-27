// Author: K


const Sequelize = require('sequelize')
const config = require('../config.js')

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect, 
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        idle: config.pool.idle
    },
    timezone: config.timezone
});

var User = sequelize.define('down_stream_user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: true
    },
    phoneNum: {
        type: Sequelize.JSON,
        allowNull: true
    },
    totalStroageCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    ad: {
        type: Sequelize.FLOAT, //广告投入系数
        allowNull: false,
        defaultValue: 0
    },
    adCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    currency: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    debt: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },


}, {
    freezeTableName: true, // use singular table name
    timestamps: true
});

var sequelize1 = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect, 
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        idle: config.pool.idle
    },
    timezone: config.timezone
});

var OneRoundSell = sequelize1.define('one_round_sell', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    round: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ka: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    kb: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    kc: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true, // use singular table name
    timestamps: true
});

/**
 * 同步或更新数据库
 */
function sync() {
    User.sync({alter: true});
    OneRoundSell.sync({alter:true});
};

/**
 * 添加用户
 */
function addUser(userId) {
    return User.create({
            userId: userId
        })
};

/**
 * 广告投入
 */
async function advertise(userId, inputData) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    var tmpAdCost = Number(prev.adCost) + Number(inputData.adInvest);

    return User.update({
        adCost: tmpAdCost,
    },{
        where: {userId: userId}
    })
}

/**
 * 售卖手机到市场
 */
async function sell(userId, inputData) {
    const result = await findUserByUserId(userId);
    const phones = result.dataValues.phoneNum;


    // const onePhone = phones.filter(function(item) {
    //     return item.ka===inputData.ka && 
    //             item.kb===inputData.kb &&
    //             item.kc===inputData.kc &&
    //             Number(item.amount)>=Number(inputData.amount);
    // });

    var valid = false;
    for(i=0;i<phones.length;i++) {
        if(phones[i].ka==inputData.ka&&phones[i].kb==inputData.kb
            &&phones[i].kc==inputData.kc&&Number(phones[i].amount>=Number(inputData.amount))) {
                valid = true;
                phones[i].amount -= inputData.amount;
            }
    }

//    if (onePhone == null) 
    if(!valid){
        console.log('Invalid Input!');
        return null;
    }
    else {

        OneRoundSell.create({
            userId: userId,
            round: inputData.round,
            ka: inputData.ka,
            kb: inputData.kb,
            kc: inputData.kc,
            price: inputData.price,
            amount: inputData.amount,
        });

        return User.update({
            phoneNum: phones,
        }, {
            where: {userId:userId}
        });
    }
}

async function debt(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var tmpDebt = Number(prev.debt) + Number(data.debt);
    return User.update({
        debt: tmpDebt,
    }, {
        where: {userId: userId}
    })
};

/**
 * 根据id查找用户
 */
function findUserByUserId(userId) {
    return User.findOne({
        where:{
            userId:userId
        }
    })
};


function clear(userId) {
    return User.update({
        phoneNum:null,
    }, {
        where: {userId: userId}
    })
};

function init(userId) {
    return User.update({
        phoneNum:[{ka:2,kb:2,kc:2,amount:100},{ka:1,kb:2,kc:3,amount:100},{ka:2,kb:2,kc:5,amount:200},]
    }, {
        where: {userId: userId}
    })
};

module.exports = {sync, addUser, findUserByUserId, advertise, sell, debt, clear, init};