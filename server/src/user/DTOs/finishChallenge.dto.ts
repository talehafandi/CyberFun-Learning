import { IsObjectId } from 'src/common/decorators/isObjectId.decorator';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, Max, Min } from "class-validator";
import { Transform } from 'class-transformer';
import { Types } from "mongoose";

export class FinishChallengeDTO {
    @IsObjectId()
    id: string | Types.ObjectId;

    username: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Max(15000)
    @Min(100)
    score: number;
}