const { User } = require('../models/user')
const { createToken, verifyToken } = require('../utils/jwt')

const UserController = {
    login(req, res) {
        // console.log(req.body)
        const { username, password } = req.body
        User.findOne({ 'username': username }, 'username password', (err, result) => {
            if (err) throw err
            if (result === null) {
                res.status(403).send('输入的学号不存在!')
            } else if (result.password !== password) {
                res.status(403).send('密码不正确！')
            } else {
                const token = createToken({ username })
                // 这里传入的token是一个string类型，所以多加一个{}包裹城Objcet对象
                res.json({
                    token
                })
            }
        })
    },
    getInfo(req, res) {
        // console.log(req.headers)
        // console.log('1',req.headers['x-access-token'])
        verifyToken(req.headers['x-access-token']).then((result) => {
            const { username } = result
            User.findOne({ 'username': username }, (err, data) => {
                if (err) throw err
                // res.json({data})
                // 这里传入的data是一个Object类型，所以不需要再加{}
                res.json(data)
            })
        }).catch(() => {
            res.status(401).send('身份验证过期，请重新登陆！')
        })
    },
    logout(req,res){
        verifyToken(req.headers['x-access-token']).then((result)=>{
            const {uername} = result
            res.json({
                code:200
            })
        }).catch(()=>{
            res.status(401).send('身份验证过期，请重新登陆！')
        })
    },
    updateInfo(req,res){
        verifyToken(req.headers['x-access-token']).then((result) => {
            const { username } = result
            const data = req.body
            const keys = Object.keys(data)
            // console.log(data[keys[0]])

            User.findOneAndUpdate({username:username},data).then(()=>{
                res.json({
                    code:200,
                    message:'修改成功'
                })
            }).catch(err=>{
                res.status(500).send('修改失败')
            })
        }).catch(() => {
            res.status(401).send('身份验证过期，请重新登陆！')
        })
    }
}

module.exports = UserController