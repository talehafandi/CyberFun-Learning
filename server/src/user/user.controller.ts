import { Types } from 'mongoose';
import { UserService } from './user.service';
import { Controller, Get, Body, Post, Delete, Put, Query, Param } from '@nestjs/common';

// Pipes
import { ParseObjectIdPipe } from './../common/pipes/ParseObjectId.pipe';
import { ValidationPipe } from '@nestjs/common/pipes';

// DTOs
import { ListUsersDTO } from './DTOs/listUser.dto';
import { GetUserDTO } from './DTOs/getUser.dto';
import { StartChallengeDTO } from 'src/user/DTOs/startChallenge.dto';
import { FinishChallengeDTO } from 'src/user/DTOs/finishChallenge.dto';

// AUTH
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) { }

    // list user
    @Get('')
    async list(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0) {
        return this.service.list({ limit, offset });
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

    //todo make score and id query
    @Get('/:username/finish-challenge')
    async finishChallenge(
        @Param("username") username: string,
        @Query(ValidationPipe) dto: FinishChallengeDTO
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
