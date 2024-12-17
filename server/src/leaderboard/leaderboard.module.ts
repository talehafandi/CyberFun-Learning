import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';

import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [LeaderboardService],
  controllers: [LeaderboardController]
})
export class LeaderboardModule { }
