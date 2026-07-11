import { IsOptional, IsString, IsHexColor } from 'class-validator';

export class HomePageDto {
  @IsOptional()
  @IsString()
  @IsHexColor()
  themeColor?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  primaryBannerUrl?: string;

  @IsOptional()
  @IsString()
  secondaryBannerUrl?: string;

  @IsOptional()
  @IsString()
  bannerTitle?: string;

  @IsOptional()
  @IsString()
  bannerSubtitle?: string;

  @IsOptional()
  @IsString()
  bannerDescription?: string;
}