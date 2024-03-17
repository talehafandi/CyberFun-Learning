import 'dotenv/config';
import path from 'path'

const config = {
    env: process.env.ENV || 'dev',
    port: process.env.PORT || 6006,
    server_url: process.env.SERVER_URL,
    db: {
        uri: process.env.DB_URI,
        pass: process.env.DB_PASS,
    },
    jwt: {
        sign: process.env.JWT_SIGN,
        expire: process.env.JWT_EXPIRE
    },
    mailer:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    cloud: {
        name: process.env.CLOUDINARY_NAME,
        key: process.env.CLOUDINARY_KEY,
        secret: process.env.CLOUDINARY_SECRET,
    },
    fs: {
        temp: './temp'
    },
}
// console.log(config)
export default config