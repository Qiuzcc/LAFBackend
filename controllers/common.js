const { Campus, Types } = require('../models/common')

const commonController = {
    getCampus(req, res) {
        Campus.find({})
            .exec((err, campus) => {
                if (err) throw err
                res.json(campus)
            })
    },
    getTypes(req, res) {
        Types.find({})
            .exec((err, types) => {
                if (err) throw err
                res.json(types)
            })
    },
    addCampus(req, res) {
        const requestBody = req.body
        const newCampus = new Campus(requestBody)
        newCampus.save((err, saved) => {
            if (err) throw err
            res.json({
                status: 200
            })
        })
    },
    addTypes(req, res) {
        const requestBody = req.body
        const newTypes = new Types(requestBody)
        newTypes.save((err, saved) => {
            if (err) throw err
            res.json({
                status: 200
            })
        })
    }
}
// 推荐的返回数据应该加上status，如{status:200,data:types}这样子

module.exports = commonController