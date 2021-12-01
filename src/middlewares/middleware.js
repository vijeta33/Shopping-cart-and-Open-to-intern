
const Jwt = require('jsonwebtoken')
const emailValidation = async function (req, res, next) {
    let data = req.body.email
    if (data) {
        const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (data.match(validEmail)) {
            next();

        } else {
            res.send({ msg: "Invalid email Id" })
        }
    } else {
        res.send({ msg: "No Email Id" })
    }
}
//*******************************middleware for valid token**********************


const checkAuthentication = async function (req, res, next) {
    let token = req.headers['x-api-key']
    if (token) {
        let validToken = Jwt.verify(token, 'radiumIrs')
        console.log(validToken)
        if (validToken) {
            req.validToken = validToken
            next()
        }

        else {
            res.send({ msg: 'not a valid token' })
        }


    } else {
        res.send({ msg: ' token missing' })

    }
}
module.exports = { emailValidation, checkAuthentication }