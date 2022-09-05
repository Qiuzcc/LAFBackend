const { STS } = require('ali-oss');

// 从配置文件中导入敏感参数，配置文件不上传到github，脱敏处理
const { ACCESSKEYID, ACCESSKEYSECRET, RAN } = require('../setting')

const getSts = (req, res) => {
    const client = new STS({
        accessKeyId: ACCESSKEYID,               //RAM用户的keyId
        accessKeySecret: ACCESSKEYSECRET        //RAM用户的keySecret
    });

    // 参数依次为RAM角色的ran（在阿里云控制台获取），policy权限设置，
    // expiration凭证有效时间，sessionName会话名称(用于区分不同的令牌)
    client.assumeRole(RAN, null, 1800).then((result) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-METHOD', 'GET');
        res.json({
            AccessKeyId: result.credentials.AccessKeyId,            //获取的临时访问密钥
            AccessKeySecret: result.credentials.AccessKeySecret,
            SecurityToken: result.credentials.SecurityToken,        //获取的安全令牌
            Expiration: result.credentials.Expiration               //安全令牌的过期时间
        });
    }).catch(err => {
        throw err;
        res.status(400).json(err.message)
    })
}

module.exports = {
    getSts
}