const mongoose = require('mongoose');
const { User } = require('../models/user')

console.log('init user')

mongoose.connect(`mongodb://localhost:27017/laf`);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const user1 = new User({
    username: '20162382158',
    password: '123456',
    name: '小丘',
    avatar: 'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314152752_img_4796_mix011661271943927',
    email: '1670906129@qq.com'
})

user1.save((err, res) => {
    if (err) throw err
    console.log('init user', res)
    mongoose.connection.close();
})

