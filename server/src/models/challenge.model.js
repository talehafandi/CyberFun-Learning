import mongoose from 'mongoose';
const Schema = mongoose.Schema

const levelEnum = {
    ONE: 1,
    TWO: 2,
    THREE: 3
}

const sceneTypeEnum = {
    MAIN: 'main',
    OUTCOME: 'outcome'
}

const Challenge = new Schema({
    topic: { type: String, required: true, trim: true },
    level: { type: Number, enum: levelEnum, default: levelEnum.ONE },
    scenes: [{
        type: { type: String, enum: sceneTypeEnum, required: true },
        description: { type: String, },
        images: [{
            url: String,
            public_id: { type: String, select: false }
        }],
        question: { type: String, required: true },
        options: [{
            text: { type: String, required: true },
            outcome: { type: Number, required: true }
        }]
    }]
})

export default mongoose.model('challenge', Challenge)