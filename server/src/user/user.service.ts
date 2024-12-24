import { UserSchema } from 'src/user/entities/user.entity';
import { ChallengeService } from './../challenge/challenge.service';
import { Challenge, ChallengeStatus, User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

// DTOs
import { ListUsersDTO } from './DTOs/listUser.dto';
import { GetUserDTO } from './DTOs/getUser.dto';
import { StartChallengeDTO } from 'src/user/DTOs/startChallenge.dto';
import { FinishChallengeDTO } from 'src/user/DTOs/finishChallenge.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly repo: Model<User>,
        @Inject(forwardRef(() => ChallengeService))
        private readonly challengeService: ChallengeService
    ) { }

    async list(listUsersDTO: ListUsersDTO): Promise<User[]> {
        try {
            const { limit, offset } = listUsersDTO;

            return this.repo
                .find()
                .sort({ totalScore: -1 })
                .limit(limit)
                .skip(offset) as unknown as User[];
        } catch (error) {
            console.log(error);
            // new ExceptionsHandler(error);
        }
    }

    async findById(id: Types.ObjectId): Promise<any> {
        try {
            const user: User = await this.repo.findById(id);            
            if (!user) throw new BadRequestException("User not found");

            return user;
        } catch (error) {
            console.log("Error at user.service: ", error)
        }
    }

    async updateOne(searchQuery: object, updateQuery: object): Promise<boolean> {
        return !!this.repo.updateOne(searchQuery, updateQuery);
    }

    // -----------CHALLANGES-----------

    // check if the user has already started/finished the challege
    async isChallengeActivatedByUser(username: string, challengeId: Types.ObjectId): Promise<boolean> {
        const user: User = await this.repo.findOne(
            { username, "challenges.challengeId": challengeId }
        );
        
        return !!user;
    }

    async startChallenge(username: string, id: Types.ObjectId): Promise<boolean> {
        try {
            const challenge = await this.challengeService.findById(id);
            if (!challenge) throw new ExceptionsHandler();

            const isActivated: boolean = await this.isChallengeActivatedByUser(username, id);
            if (isActivated) throw new BadRequestException("Challenge already active or finished!");

            const challengePayload = {
                challengeId: id,
                status: ChallengeStatus.INCOMPLETE,
                startAt: Date.now(),
                endedAt: null,
                score: 0
            }

            const user = this.repo.updateOne(
                { username },
                { $push: { challenges: challengePayload } }
            )
            if (!user) throw new ExceptionsHandler();

            return true;
        } catch (error) {
            //todo: fix this error handling
            throw new BadRequestException(error.message);
        }
    }

    async finishChallenge(dto: FinishChallengeDTO): Promise<boolean> {
        try {
            const { id, username, score } = dto;

            const user = this.repo.findOneAndUpdate(
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
        } catch (error) {
            //
        }
    }

    async getChallengesByUsername(username: string) {
        const challenges: Challenge[] = await this.repo.findOne({ username }, { _id: 0, challenges: true });
        // console.log(challenges)
        return challenges;
    }
}

