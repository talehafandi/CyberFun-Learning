import mongoose from 'mongoose';
const Schema = mongoose.Schema

const User = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    address: {
        country: { type: String },
        city: { type: String },
        street: { type: String },
        zipCode: { type: String }
    },
    role: { type: String, default: 'user' },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { type: String, required: true, select: false },
    forgotPasswordCode: { type: String },
    approved: { type: Boolean, default: false },
    confirmationCode: { type: String, defaul: null },
    oAuth: { type: Boolean, default: false, select: false }
})

// ! Add middleware to diselect password field in find querry

export default mongoose.model('user', User);
