import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateGalleryImageDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    caption?: string[];
}