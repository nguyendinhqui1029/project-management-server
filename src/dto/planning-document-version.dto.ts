import { Type } from 'class-transformer';
import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRefDto } from '@dto/user.dto';
import { PlanningDocumentRefDto } from '@dto/planning-document.dto';

export class CreatePlanningDocumentVersionBodyDto {
  @ValidateNested()
  @Type(() => PlanningDocumentRefDto)
  document!: PlanningDocumentRefDto;

  @IsNotEmpty({ message: 'Version is required' })
  @IsString()
  version!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsJSON()
  content!: string;

  @ValidateNested()
  @Type(() => UserRefDto)
  createdBy!: UserRefDto;
}

export class UpdatePlanningDocumentVersionBodyDto {
  @ValidateNested()
  @Type(() => PlanningDocumentRefDto)
  document!: PlanningDocumentRefDto;

  @IsNotEmpty({ message: 'Version is required' })
  @IsString()
  version!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsJSON()
  content!: string;

  @ValidateNested()
  @Type(() => UserRefDto)
  createdBy!: UserRefDto;
}

export class FetchPlanningDocumentVersionRequestQueryDto {
  @IsNotEmpty({ message: 'Limit is required' })
  @IsNumber({}, { message: 'Limit must be a number' })
  limit!: number;

  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber({}, { message: 'Page must be a number' })
  page!: number;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  document?: string;
}
