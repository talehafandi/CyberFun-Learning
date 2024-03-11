import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes/_index.js';
import config from './config.js'
import handleError from './error/handleError.js';


const app = express()

app.use(cors())
app.use(helmet())

app.use(express.json())

app.use('/api/v1', routes)

app.use((_, res, next) => {
    res.status(404).send({ message: 'PAGE NOT FOUND' })
    next()
})

app.use(handleError);

const PORT = config.port || 6006;
const dbURI = config.db.uri.replace("<password>", config.db.pass)

mongoose.set('strictQuery', false);
// mongoose.connect(DB, (err) => {
//     if (err) return console.log("err: ", err);

//     app.listen(PORT, () => console.log("Server is running on PORT: ", PORT))
// })

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log("Server is running on PORT: ", PORT))
        console.log('Connected to MongoDB')
    })
    .catch((error) => console.error('Connection error', error));
