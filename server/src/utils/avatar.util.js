import cloud from '../utils/cloud.util.js'
import fs from 'fs'
import path from 'path'
import config from '../config.js'
import request from 'request'

async function download(uri, filename) {
    try {
        return await new Promise(resolve => {
            request.head(uri, () => {
                request(uri)
                    .pipe(fs.createWriteStream(filename))
                    .on('close', resolve)
            })
        })
    } catch (err) {
        console.log(err)
    }
}

async function generateAvatar(fullname) {
    const colors = [ 'f44336', 'e91e63', '9c27b0', '673ab7', '3f51b5', '2196f3', '03a9f4', '00bcd4', 
    '009688', '4caf50', '8bc34a', 'cddc39', 'ffeb3b']

    const color = colors[Math.floor(Math.random() * colors.length)]
    const fullUrl =  `https://ui-avatars.com/api/?background=${color}&color=fff&name=${fullname}`

    const filename = `avatar-${Date.now()}.png`
    console.log("config.fs.temp: ", config.fs.temp)
    const filePath = path.join(config.fs.temp, filename)

    await download(fullUrl, filePath)

    const avatar = cloud.upload(filePath)
    return avatar
}

export default generateAvatar