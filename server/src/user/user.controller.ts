import { Types } from 'mongoose';
import { UserService } from './user.service';
import { Controller, Get, Body, Post, Delete, Put, Query, Param, UsePipes } from '@nestjs/common';

// Pipes
import { ParseObjectIdPipe } from './../common/pipes/ParseObjectId.pipe';
import { ValidationPipe } from '@nestjs/common/pipes';

// DTOs
import { FinishChallengeDTO } from 'src/user/DTOs/finishChallenge.dto';
import { filterQueryDTO } from './../common/DTOs/filterQuery.dto';

// AUTH
// import { UseGuards } from '@nestjs/common/decorators';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) { }

    // list user
    @Get('')
    @UsePipes(new ValidationPipe({ transform: true }))
    async list(
        @Query() dto: filterQueryDTO
    ) {
        return this.service.list({ limit: dto.limit, offset: dto.offset });
    }

    @Get(':id')
    async getOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
        try {
            return this.service.findById(id)
        } catch (error) {
            console.log("Error at user.controller: ", error)
        }
    }

    // @Post()
    // todo add update,remove

    //? is trycatch needed?
    @Get('/:username/start-challenge')
    async startChallenge(
        @Param("username") username: string,
        @Query("id", ParseObjectIdPipe) id: Types.ObjectId,
    ) {
        return this.service.startChallenge(username, id);
    }

    @Get('/:username/finish-challenge')
    @UsePipes(new ValidationPipe({ transform: true }))
    async finishChallenge(
        @Param("username") username: string,
        @Query() dto: FinishChallengeDTO
    ) {
        return this.service.finishChallenge({ username, ...dto });
    }

    @Get('/:username/challenges')
    async getChallengesByUsername(
        @Param("username") username: string
    ) {
        return await this.service.getChallengesByUsername(username) as any;
    }
}
