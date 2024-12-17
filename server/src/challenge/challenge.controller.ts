import { StartChallengeDTO } from './DTOs/startChallenge.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Controller, Get, Post, Delete, Patch, Query, Param, Body } from '@nestjs/common';
// Service
import { ChallengeService } from './challenge.service';
// DTOs
import { GetChallengeDTO } from './DTOs/getChallenge.dto.';
import { ListChallengeDTO } from './DTOs/listChallenge.dto';
import { FinishChallengeDTO } from './DTOs/finishChallenge.dto';



@Controller('challenge')
export class ChallengeController {
    constructor(private readonly service: ChallengeService){}

    @Get('')
    async list(@Query(ValidationPipe) dto: ListChallengeDTO){
        return this.service.list(dto);
    }

    @Get(':id')
    async getOne(@Param(ValidationPipe) dto: GetChallengeDTO){
        return this.service.getOne(dto)
    }

    @Patch('/start/:id/:username')
    async startChallenge(@Param(ValidationPipe) dto: StartChallengeDTO){
        return this.service.startChallenge(dto);
    }

    @Patch('/finish/:id/:username')
    async finishChallenge(@Param(ValidationPipe) dto: FinishChallengeDTO){
        return this.service.finishChallenge(dto)
    }
}
