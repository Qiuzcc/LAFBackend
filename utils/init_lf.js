const { Found, Lost } = require('../models/lost_and_found')
const { User } = require('../models/user')
const mongoose = require('mongoose');
const async = require("async");

console.log('init lost and found')

mongoose.connect(`mongodb://localhost:27017/laf`);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function init() {
    // async-await的写法在服务器上不知道为何不支持，没有实现await的效果，导致出错
    // var data = await User.findOne({ username: '20162382158' }, "_id")
    // // console.log('data',data)
    // console.log('用户属性', data)
    // var userId = data._id
    // initLF(userId)
    
    User.findOne({ username: '20162382158' }, "_id",(err,data)=>{
        if(err){console.error(err)}
        console.log('用户属性',data)
        var userId = data._id
        initLF(userId)
    })
}

function initLF(userId) {
    var date = Date.now()
    const found1 = new Found({
        title: '寻物启事1',
        campus: '石牌校区',
        location: '教学楼',
        time: date,
        type: '校卡',
        description: '在教学楼205捡到一张校卡',
        photos: [
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314152752_img_4796_mix011661271943927',
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314153605_img_4804_mix021661323934267'
        ],
        status: '已找到',
        user: userId
    })
    const found2 = new Found({
        title: '寻物启事2',
        campus: '石牌校区',
        location: '教学楼',
        time: date,
        type: '校卡',
        description: '在教学楼205捡到一张校卡',
        photos: [
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314152752_img_4796_mix011661271943927',
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314153605_img_4804_mix021661323934267'
        ],
        status: '寻找中',
        user: userId
    })

    const lost1 = new Lost({
        title: '失物1',
        campus: '石牌校区',
        location: '教学楼',
        time: date,
        type: '校卡',
        description: '在教学楼205捡到一张校卡',
        photos: [
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314152752_img_4796_mix011661271943927',
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314153605_img_4804_mix021661323934267'
        ],
        status: '等待认领',
        user: userId
    })
    const lost2 = new Lost({
        title: '失物2',
        campus: '石牌校区',
        location: '教学楼',
        time: date,
        type: '校卡',
        description: '在教学楼205捡到一张校卡',
        photos: [
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314152752_img_4796_mix011661271943927',
            'https://scnu-lostandfound.oss-cn-guangzhou.aliyuncs.com/photos/20200314153605_img_4804_mix021661323934267'
        ],
        status: '已被认领',
        user: userId
    })

    async.parallel([
        (cb) => {
            found1.save(cb)
        },
        (cb) => {
            found2.save(cb)
        },
        (cb) => {
            lost1.save(cb)
        },
        (cb) => {
            lost2.save(cb)
        }
    ], (err, res) => {
        if (err) throw err;
        console.log('init found1', res[0])
        console.log('init found2', res[1])
        console.log('init lost1', res[2])
        console.log('init lost2', res[3])

        mongoose.connection.close();
    })
}

init()