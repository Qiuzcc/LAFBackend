const { Lost } = require('../models/lost_and_found')
const { User } = require('../models/user')
const { verifyToken } = require('../utils/jwt')

const LostController = {
    add(req, res) {
        verifyToken(req.headers['x-access-token']).then((result) => {
            const { username } = result
            const requestBody = req.body    // 从post数据中获取物品基本信息
            const newLost = new Lost(requestBody)
            User.findOne({ username }, '_id', (err, { _id: id }) => {
                if (err) throw err
                // console.log(id)
                newLost.user = id           // 从token中获取用户信息，并绑定用户id到found中
                newLost.save((err, saved) => {
                    if (err) throw err
                    res.json()
                })
            })
        }).catch(() => {
            res.status(401).send('身份验证过期，请重新登陆！')
        })
    },
    list(req, res) {
        Lost.find({}, 'title campus time type description photos status')    //限定返回的数据范围
            .sort({ 'time': -1 })
            .exec((err, data) => {
                if (err) throw err
                res.json(data)
            })
    },
    detail(req, res) {
        verifyToken(req.headers['x-access-token']).then(() => {
            const { id } = req.query   //传入的req.body应该是{id:xxx}的形式
            Lost.findById(id, '-user', (err, data) => {
                if (err) throw err
                res.json(data)
            })
        }).catch(() => {
            res.status(401).send('需要登陆才能查看！')
        })
    },
    user(req, res) {
        verifyToken(req.headers['x-access-token']).then((result) => {
            const { username } = result     //需要在请求头中加入token
            const pwd = req.body.password  //需要post传入密码
            const { id } = req.query        //url中需要加入id参数
            // console.log(pwd)
            // console.log(id)
            User.findOne({ username }, 'password', (err, data) => {
                if (err) throw err
                const { password } = data
                // console.log(password)
                if (password === pwd) {
                    //密码验证通过,获取用户信息并返回。这里的操作需要谨慎，涉及到密码等敏感信息，不要把敏感信息也发送出去了，需要信息脱敏
                    Lost.findById(id, 'user').populate('user', '_id username avatar email').exec((err, data) => {
                        // 限定返回的数据：id（预留，通讯功能）；username、avatar、email（用于显示）
                        // console.log(data)
                        res.json(data)
                    })
                } else {
                    //密码错误
                    res.status(401).send('密码错误')
                }
            })
        }).catch(() => {
            res.status(401).send('需要登陆才能查看！')
        })
    },
    filter(req, res) {
        const query = req.query

        //需要把时间和 校区、类型拆分开来
        const filter = {}
        if (query.campus) { filter.campus = query.campus }
        if (query.type) { filter.type = query.type }
        if (query.date) {
            filter.time = { $gt:query.date }                //实际测试发现，不用转换也可以，推测原因是因为在比较的时候发生了自动类型转换

            // const tmp = Date.parse(query.date)          //传入的类型是这种：Sun Aug 28 2022 10:28:25 GMT+0800 ，但是担心传输时Date类型被转换成String
            // filter.time = { $gt: new Date(tmp) }       //所以先转换成时间戳，再用时间戳转换成Date类型，同时把key值改为和数据库中相同的time，$gt表示大于的意思
            //这里表示查询query.date时间之后的数据
        }
        // console.log(filter)

        Lost.find(filter, 'title campus time type description photos status', (err, data) => {
            if (err) {
                //本来想返回一个错误状态码加提示的，但是实在没有合适的状态码表示这种情况
                throw err
            }
            // console.log(data)
            res.json(data)
        })
    }
    // test(req,res){
    //     console.log(req.body)
    //     const data = req.body
    //     console.log(data)
    //     res.json()
    // }
}

module.exports = LostController