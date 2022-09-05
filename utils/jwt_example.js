const jwt = require('jsonwebtoken')
const secretKey = 'lafjwt'    //加密的key（密钥）

/**
 * 生成token
 * @param {Object} info 需要存入token的信息，传入的类型要求为Object
 * @returns 
 */
function createToken(info) {
    let token = jwt.sign(info, secretKey, {
        expiresIn: 60 * 60 * 10  //Token有效时间 单位s , 1小时过期
    })
    return token
}

//验证Token
/**
 * 异步的方式验证token
 * @param {String} token 
 * @returns 
 */
function verifyToken_asyc(token) {
    return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (error, result) => {
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
		})
	})
}
/**
 * 同步的方式验证token
 * @param {String} token 
 * @returns 
 */
function verifyToken_sync(token) {

	const valid = jwt.verify(token, secretKey)
    return valid
}

// 异步验证
// let token = createToken({username:'Q'})
// console.log(token)
// verifyToken_asyc(token).then(res=>{
//     console.log(res)
// }).catch(err=>{
//     throw err
// })

// 同步验证
let token = createToken({username:'Q'})
console.log(token)
const valid = verifyToken_sync(token)
console.log(valid)

// 只要token没过期，不过是否重启多少次项目服务器保存的token都还在