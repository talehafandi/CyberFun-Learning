import mongoose from 'mongoose';
const Schema = mongoose.Schema

const UserRoles = {
    USER: 'user',
    ADMIN: 'admin',
    MOD: 'moderator'
}

const Genders = {
    F: 'M',
    M: 'F',
    NONE: 'none'
}

const ChallengeStatus = {
    COMPLETE: 'complete',
    INCOMPLETE: 'incomplete'
}

const Fields = {
    HEALTHCARE_MEDICINE: "Healthcare/Medicine",
    EDUCATION_TEACHING: "Education/Teaching",
    FINANCE_ACCOUNTING: "Finance/Accounting",
    LAW_LEGAL_SERVICES: "Law/Legal Services",
    MARKETING_ADVERTISING: "Marketing/Advertising",
    SALES_RETAIL: "Sales/Retail",
    HUMAN_RESOURCES: "Human Resources",
    ENGINEERING: "Engineering (excluding IT-related specializations)",
    HOSPITALITY_TOURISM: "Hospitality/Tourism",
    CONSTRUCTION_ARCHITECTURE: "Construction/Architecture",
    AGRICULTURE_FARMING: "Agriculture/Farming",
    MANUFACTURING_PRODUCTION: "Manufacturing/Production",
    TRANSPORTATION_LOGISTICS: "Transportation/Logistics",
    MEDIA_COMMUNICATION: "Media/Communication",
    GOVERNMENT_PUBLIC_SERVICE: "Government/Public Service",
    ARTS_ENTERTAINMENT: "Arts/Entertainment",
    SOCIAL_WORK_NON_PROFIT: "Social Work/Non-profit",
    PSYCHOLOGY_COUNSELING: "Psychology/Counseling",
    RESEARCH_SCIENCE: "Research/Science (excluding IT-related research)",
    SPORTS_FITNESS: "Sports/Fitness",
    OTHER: 'Other'
}

const User = new Schema({
    // basic info
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    role: { type: String, enum: UserRoles, default: UserRoles.USER },
    possession: { type: String, enum: Fields, required: true }, //? would be better if we make it enum?
    gender: { type: String, enum: Genders, default: Genders.NONE },
    avatar: {
        url: String,
        public_id: { type: String, select: false }
    },
    challenges: [{
        courseId: { type: Schema.Types.ObjectId },
        score: { type: Number, default: 0 },
        startedAt: { type: Date, required: true },
        endedAt: { type: Date, required: true },
        status: { type: String, enum: ChallengeStatus, required: true, default: ChallengeStatus.INCOMPLETE }
    }],
    totalScore: { type: Number, required: true, default: 0 },
    rank: { type: Number, default: 0 },
    // contact details
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    // auth
    password: { type: String, required: true, select: false },
    forgotPasswordCode: { type: String },
    approved: { type: Boolean, default: false },
    confirmationCode: { type: String, defaul: null },
    oAuth: { type: Boolean, default: false, select: false }
})

// ! Add middleware to diselect password field in find querry

export default mongoose.model('user', User);
