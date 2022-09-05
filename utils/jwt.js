const jwt = require('jsonwebtoken')
const secretKey = 'lafjwt'    //加密的key（密钥）

/**
 * 生成token
 * @param {Object} info 需要存入token的信息，传入的类型要求为Object
 * @returns 
 */
function createToken(info) {
    let token = jwt.sign(info, secretKey, {
        expiresIn: 6 * 60 * 60   //Token有效时间 单位s , 6小时过期
    })
    return token
}

//验证Token
/**
 * 
 * @param {String} token 
 * @returns 
 */
function verifyToken(token) {
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
module.exports = { createToken, verifyToken }