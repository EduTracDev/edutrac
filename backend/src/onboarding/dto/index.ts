import { IsArray, IsHexColor, IsOptional, IsString, IsEmail, isNotEmpty, ValidateNested, ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsDefined } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CompleteOnboardingAccountDto {
  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsString()
  @IsNotEmpty()
  contactAddress: string;

  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;
}

export class CompleteOnboardingWebsiteDto {
  @IsHexColor()
  @IsNotEmpty()
  themeColor: string;

  @IsString()
  @IsNotEmpty()
  bannerTitle: string;

  @IsString()
  @IsNotEmpty()
  bannerDescription: string;

  @IsString()
  @IsNotEmpty()
  FooterTitle: string;

  @IsString()
  @IsNotEmpty()
  History: string;

  @IsString()
  @IsNotEmpty()
  Vision: string;

  @IsString()
  @IsNotEmpty()
  Mission: string;
}

export class CompleteOnboardingGalleryItemDto {
  @IsOptional()
  @IsString()
  caption?: string;
}

export class CompleteOnboardingDto {
  @IsDefined({ message: 'Missing required fields: domain, contact address, contact phone, contact email' })
  @Transform(({ value }) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  )
  @ValidateNested()
  @Type(() => CompleteOnboardingAccountDto)
  account: CompleteOnboardingAccountDto;

  @IsDefined({ message: 'Missing required fields: theme color, banner title, banner subtitle, banner description' })
  @Transform(({ value }) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  )
  @ValidateNested()
  @Type(() => CompleteOnboardingWebsiteDto)
  website: CompleteOnboardingWebsiteDto;

  @Transform(({ value }) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  )
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => CompleteOnboardingGalleryItemDto)
  gallery: CompleteOnboardingGalleryItemDto[];
}