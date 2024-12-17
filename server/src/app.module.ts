import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ChallengeModule } from './challenge/challenge.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    LeaderboardModule,
    ChallengeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


