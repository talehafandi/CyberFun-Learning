import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

import { ListUsersDTO } from './DTOs/listUser.dto';
import { GetUserDTO } from './DTOs/getUser.dto';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(@InjectModel(User.name) private readonly repo: Model<User>) {}

    async list(listUsersDTO: ListUsersDTO): Promise<User[]> {
        try {
            const { limit, offset } = listUsersDTO;

            return this.repo.find().sort({ totalScore: -1 }) as unknown as User[];
        } catch (error) {
            console.log(error);
            // new ExceptionsHandler(error);
        }
    }

    async findById(id: Types.ObjectId): Promise<any> {
        try {
            const user: User = await this.repo.findById(id);
            // if (!user) return null;
            console.log("user: ", user)

            return user;
        } catch (error) {
            console.log("Error at user.service: ", error)
        }
    }
}

