import { Challenge } from './entities/challenge.entity';

import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

// Entities
// import { ChallengeStatus } from 'src/user/entities/user.entity';

// DTOs
// import { GetChallengeDTO } from './DTOs/getChallenge.dto.';
import { filterQueryDTO } from 'src/common/DTOs/filterQuery.dto';



@Injectable()
export class ChallengeService {
    constructor(
        @InjectModel(Challenge.name) private readonly repo: Model<Challenge>
    ) { }

    async list(dto: filterQueryDTO): Promise<any> {
        return this.repo.find().limit(dto.limit);
    }

    async findById(id: Types.ObjectId): Promise<Challenge> {
        const challenge = this.repo.findById(id) as unknown as Challenge;

        if (!challenge) throw new BadRequestException("something went wrong!");

        return challenge;
    }
}
