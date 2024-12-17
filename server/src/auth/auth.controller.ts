import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}

    @Post('/signup')
    async singup(@Body(ValidationPipe) dto: any){
        return this.service.signup(dto);
    }

    @Post('/login')
    async login(@Body(ValidationPipe) dto: any){
        return this.service.login(dto);
    }
}
