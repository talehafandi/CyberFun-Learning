import { Challenge } from './entities/challenge.entity';

import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

// Entities
import { ChallengeStatus } from 'src/user/entities/user.entity';

// DTOs
import { GetChallengeDTO } from './DTOs/getChallenge.dto.';
import { StartChallengeDTO } from '../user/DTOs/startChallenge.dto';
import { ListChallengeDTO } from './DTOs/listChallenge.dto';
import { FinishChallengeDTO } from '../user/DTOs/finishChallenge.dto';

// SERVICES
import { UserService } from 'src/user/user.service';


@Injectable()
export class ChallengeService {
    constructor(
        @InjectModel(Challenge.name) private readonly repo: Model<Challenge>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) { }

    async list(dto: ListChallengeDTO): Promise<any> {
        return this.repo.find().limit(dto.limit);
    }

    async findById(id: Types.ObjectId): Promise<Challenge> {
        const challenge = this.repo.findById(id) as unknown as Challenge;

        if (!challenge) throw new BadRequestException("something went wrong!");

        return challenge;
    }

    async startChallenge(dto: StartChallengeDTO) {
        const { id, username } = dto;

        const challenge = this.repo.findById(id);
        if (!challenge) throw new BadRequestException("something went wrong!");

        const challengePayload = {
            challengeId: id,
            status: ChallengeStatus.INCOMPLETE,
            startAt: Date.now(),
            endedAt: null,
            score: 0
        }

        const user = this.userService.updateOne(
            { username },
            { $push: { challenges: challengePayload } }
        )
        if (!user) throw new BadRequestException("something went wrong!");

        return true;
    }

    async finishChallenge(dto: FinishChallengeDTO) {
        const { id, username, score } = dto;

        const user = this.userService.updateOne(
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
        if (!user) throw new BadRequestException("something went wrong!");

        return true;
    }

}
