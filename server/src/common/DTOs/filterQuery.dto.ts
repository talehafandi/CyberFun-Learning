import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class filterQueryDTO {
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    limit: number = 50;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    offset: number = 1;
}