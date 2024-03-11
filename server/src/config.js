import 'dotenv/config';
import path from 'path'

const config = {
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
        temp: path.dirname(process.env.FS_UPLOADS || 'temp')
    },
}
// console.log(config)
export default config