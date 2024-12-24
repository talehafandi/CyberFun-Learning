import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

import { Challenge, ChallengeSchema } from './entities/challenge.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema }])
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService]
})
export class ChallengeModule { }
