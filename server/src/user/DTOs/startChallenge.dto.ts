import { IsNumber, isNumberString } from "class-validator";

export class StartChallengeDTO{
    @IsNumber()
    id: number;
    username: string;
}