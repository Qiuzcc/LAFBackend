const mongoose = require('mongoose');
const async = require("async");
const { Campus, Types } = require('../models/common')

console.log('init common')

mongoose.connect(`mongodb://localhost:27017/laf`);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const campus1 = new Campus({
    name:"石牌校区"
})
const campus2= new Campus({
    name:"大学城校区"
})
const campus3 = new Campus({
    name:"南海校区"
})
const campus4= new Campus({
    name:"汕尾校区"
})

const types1 = new Types({
    type:'校卡'
})
const types2 = new Types({
    type:'背包'
})
const types3 = new Types({
    type:'雨伞'
})
const types4 = new Types({
    type:'水杯'
})

async.parallel([
    (cb)=>{campus1.save()},
    (cb)=>{campus2.save()},
    (cb)=>{campus3.save()},
    (cb)=>{campus4.save()},
    (cb)=>{types1.save()},
    (cb)=>{types2.save()},
    (cb)=>{types3.save()},
    (cb)=>{types4.save()},
],(err,res)=>{
    if (err) throw err;
    console.log('init campus', res[0])
    console.log('init campus', res[1])
    console.log('init campus', res[2])
    console.log('init campus', res[3])
    console.log('init types', res[4])
    console.log('init types', res[5])
    console.log('init types', res[6])
    console.log('init types', res[7])

    mongoose.connection.close();
})