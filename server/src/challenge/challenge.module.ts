import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

import { Challenge, ChallengeSchema } from './entities/challenge.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema }]),
    forwardRef(() => UserModule)
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService]
})
export class ChallengeModule { }
