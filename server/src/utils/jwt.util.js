import jsonwebtoken from 'jsonwebtoken'
import config from '../config.js'

export const sign = (user) => {
    // console.log("user: ", user);
    let claims = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname
    }
    // console.log("claims: ", claims);
    // console.log(config.jwt.expire);
    return jsonwebtoken.sign(
        claims, 
        config.jwt.sign,
        { expiresIn: config.jwt.expire }
    )
}

export const verify = function (token) {
    return jsonwebtoken.verify(token, config.jwt.sign)
}

export const decode = (token) => jsonwebtoken.decode(token)

export default {
    sign,
    verify,
    decode
}
