import { IsNumber, IsNumberString } from "class-validator";
export class FinishChallengeDTO {
    @IsNumberString()
    id: string;
    username: string;
    @IsNumberString()
    score: string;
}