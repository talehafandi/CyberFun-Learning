import { genSaltSync, hashSync, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

// DTOs
import { SignupDTO } from './DTOs/signup.dto';
import { LoginDTO } from './DTOs/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly repo: Model<User>,
        private readonly JwtService: JwtService
    ) { }

    private readonly passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    async signup(dto: SignupDTO) {
        const { email, password } = dto;

        const user: User = await this.repo.findOne({ email });

        // check if exists
        if (user && user.approved) return { message: "User already exists" }
        if (user) return { message: "code already sent" }

        // check if password is valid
        if (!this.passwordRegEx.test(password)) return { message: "password is weak!" };

        // hash password
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        const username = email.split('@')[0];

        const userPayload = { ...dto, username, password: hashedPassword };
        // fix that later
        // @ts-ignore
        const newUser: User = await this.repo.create(userPayload);
        newUser.save();

        // console.log(this.JwtService)

        const token = await this.JwtService.signAsync({id: user._id, firstName: user.firstName, lastName: user.lastName})
        // console.log(token)

        return { message: "User created", token };
    }

    async login(dto: LoginDTO) {
        const { email, password } = dto;
        // fix that later
        // @ts-ignore
        const user: User = await this.repo.findOne({ email }).select('+password');

        if (!user) return { message: "invalid credentials" };

        const isPasswordMatched = await compare(password, user.password);
        if (!isPasswordMatched) return { message: "invalid credentials" };

        return { token: this.JwtService.signAsync(user) };
    }
}
