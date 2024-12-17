import { ParseObjectIdPipe } from './../common/pipes/ParseObjectId.pipe';
import { Types } from 'mongoose';
import { UserService } from './user.service';
import { Controller, Get, Body, Post, Delete, Put, Query, Param } from '@nestjs/common';

import { ValidationPipe } from '@nestjs/common/pipes';

import { ListUsersDTO } from './DTOs/listUser.dto';
import { GetUserDTO } from './DTOs/getUser.dto';

import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly service: UserService){}

    // list user
    @Get('')
    async list(@Query(ValidationPipe) dto: ListUsersDTO) {
        return this.service.list(dto);
    }

    @Get(':id')
    async getOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId){
        try {
            console.log("Type: ", typeof id)
            // ? it passes string, but no error?
            return this.service.findById(id)
        } catch (error) {
            console.log("Error at user.controller: ", error)
        }
    }
    
    // @Post()
    // todo add update,remove
}
