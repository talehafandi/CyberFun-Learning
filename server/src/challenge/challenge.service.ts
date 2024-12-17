import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Challenge } from './entities/challenge.entity';
import { User } from 'src/user/entities/user.entity';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Entities
import { ChallengeStatus } from 'src/user/entities/user.entity';

// DTOs
import { GetChallengeDTO } from './DTOs/getChallenge.dto.';
import { StartChallengeDTO } from './DTOs/startChallenge.dto';
import { ListChallengeDTO } from './DTOs/listChallenge.dto';
import { FinishChallengeDTO } from './DTOs/finishChallenge.dto';


@Injectable()
export class ChallengeService {
    constructor(
        @InjectModel(Challenge.name) private readonly repo: Model<Challenge>,
        @InjectModel(User.name) private readonly userRepo: Model<User>
    ) { }

    async list(dto: ListChallengeDTO): Promise<any> {
        return this.repo.find().limit(dto.limit);
    }

    async getOne(dto: GetChallengeDTO): Promise<Challenge> {
        const challenge = this.repo.findById(dto.id) as unknown as Challenge;

        if (!challenge) throw new ExceptionsHandler();

        return challenge;
    }

    async startChallenge(dto: StartChallengeDTO) {
        const { id, username } = dto;

        const challenge = this.repo.findById(id);
        if (!challenge) throw new ExceptionsHandler();

        const challengePayload = {
            challengeId: id,
            status: ChallengeStatus.INCOMPLETE,
            startAt: Date.now(),
            endedAt: null,
            score: 0
        }

        const user = this.userRepo.updateOne(
            { username },
            { $push: { challenges: challengePayload } }
        )
        if (!user) throw new ExceptionsHandler();

        return true;
    }

    async finishChallenge(dto: FinishChallengeDTO) {
        const { id, username, score } = dto;

        const user = this.userRepo.findOneAndUpdate(
            // find
            {
                username: username,
                "challenges.challengeId": id,
                "challenges.status": ChallengeStatus.INCOMPLETE
            },
            // update
            {
                $set: {
                    "challenges.$.status": ChallengeStatus.COMPLETE,
                    "challenges.$.endedAt": Date.now(),
                    "challenges.$.score": score
                },
                $inc: { totalScore: score }
            }

        )
        if (!user) throw new ExceptionsHandler();

        return true;
    }

}
