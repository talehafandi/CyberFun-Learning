import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

import { Challenge, ChallengeSchema } from './entities/challenge.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule { }
