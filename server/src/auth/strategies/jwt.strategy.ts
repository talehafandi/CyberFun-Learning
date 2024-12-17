import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
// import { JwtPayload } from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly UserService: UserService,
        private readonly configService: ConfigService<any>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(req: Request, payload: JwtPayload) {
        const user: User = await this.UserService.findById(payload.id);
        if (!user) return { message: "Expired" }
    return payload;
}
}

type JwtPayload = {
    id: Types.ObjectId,
    firstName: string,
    lastName: string,
}