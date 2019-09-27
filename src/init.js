// var User = require('./models/User');
// user.sync();

var upStreamUser = require('./models/UpStreamUser');
upStreamUser.sync();
upStreamUser.addUser('group1')
upStreamUser.addUser('group2')
upStreamUser.addUser('group3')


var middleStreamUser = require('./models/MiddleStreamUser');
middleStreamUser.sync();
middleStreamUser.addUser('group4')
middleStreamUser.addUser('group5')
middleStreamUser.addUser('group6')
middleStreamUser.addUser('group7')

var downStreamUser = require('./models/DownStreamUser');
downStreamUser.sync();
downStreamUser.addUser('group8')
downStreamUser.addUser('group9')
downStreamUser.addUser('group10')

