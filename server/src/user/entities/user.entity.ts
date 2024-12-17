import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
  MOD = 'moderator',
}

export enum Genders {
  F = 'M',
  M = 'F',
  NONE = 'none',
}

export enum ChallengeStatus {
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
}

export enum Fields {
  HEALTHCARE_MEDICINE = 'Healthcare/Medicine',
  EDUCATION_TEACHING = 'Education/Teaching',
  FINANCE_ACCOUNTING = 'Finance/Accounting',
  // Add other fields...
  OTHER = 'Other',
}


@Schema()
export class Challenge {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  challengeId: MongooseSchema.Types.ObjectId;

  @Prop({ default: 0 })
  score: number;

  @Prop({ required: true })
  startedAt: Date;

  @Prop({ default: null })
  endedAt: Date | null;

  @Prop({ enum: ChallengeStatus, default: ChallengeStatus.INCOMPLETE })
  status: ChallengeStatus;
}

const ChallengeSchema = SchemaFactory.createForClass(Challenge);

@Schema()
export class User extends Document {
  // Basic Info
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ enum: UserRoles, default: UserRoles.USER })
  role: string;

  @Prop({ enum: Fields })
  possession: string;

  @Prop({ enum: Genders })
  gender: string;

  @Prop({ type: { url: String, public_id: String }, select: false })
  avatar: { url: string; public_id: string };

  @Prop([{ url: String, name: String, acquiredAt: Date }])
  badges: Array<{ url: string; name: string; acquiredAt: Date }>;

  @Prop({ type: [ChallengeSchema] })
  challenges: Challenge[];

  // Ranking
  @Prop({ default: 0 })
  totalScore: number;

  @Prop({ default: 0 })
  rank: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' } as any)
  nextUser: MongooseSchema.Types.ObjectId;

  // Streak
  @Prop({ default: Date.now })
  lastChallengeSubmittedAt: Date;

  @Prop({ default: 0 })
  currentStreak: number;

  @Prop({ default: 0 })
  longestStreak: number;

  // Contact Details
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  // Auth
  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  forgotPasswordCode?: string;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ default: null })
  confirmationCode?: string;

  @Prop({ default: false, select: false })
  oAuth: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
