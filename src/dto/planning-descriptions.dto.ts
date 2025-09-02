import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { UserRefDto } from '@dto/user.dto';
import { PlanningDocumentRefDto } from '@dto/planning-document.dto';


export class CreatePlanningDescriptionBodyDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title!: string;

  @IsNotEmpty({ message: 'Rules is required' })
  @IsJSON()
  rules!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Messages is required' })
  @IsJSON()
  messages!: string;

  @ValidateNested()
  @Type(() => UserRefDto)
  createdBy!: UserRefDto;

  @ValidateNested()
  @Type(() => PlanningDocumentRefDto)
  documents!: PlanningDocumentRefDto[];
}

export class UpdatePlanningDescriptionBodyDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title!: string;

  @IsNotEmpty({ message: 'Rules is required' })
  @IsJSON()
  rules!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Messages is required' })
  @IsJSON()
  messages!: string;

  @ValidateNested()
  @Type(() => UserRefDto)
  createdBy!: UserRefDto;

  @ValidateNested()
  @Type(() => PlanningDocumentRefDto)
  documents!: PlanningDocumentRefDto[];
}

export class FetchPlanningDescriptionRequestQueryDto {
  @IsNotEmpty({ message: 'Limit is required' })
  @IsNumber({}, { message: 'Limit must be a number' })
  limit!: number;

  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber({}, { message: 'Page must be a number' })
  page!: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}