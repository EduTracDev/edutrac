import { IsInt, IsObject, IsOptional, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { AccountInfoDto, BannerDto, HomePageDto } from './index';

export class OnboardingUpdateDto {
  @IsInt()
  @Min(0)
  @Max(3)
  step: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AccountInfoDto)
  accountInfo?: AccountInfoDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => HomePageDto)
  homePage?: HomePageDto;

  // @IsOptional()
  // @IsObject()
  // @ValidateNested()
  // @Type(() => SetupOptionsDto)
  // setupOptions?: SetupOptionsDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BannerDto)
  banner?: BannerDto;
}