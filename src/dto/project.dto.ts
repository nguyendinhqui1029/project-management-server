import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRefDto } from '@dto/user.dto';

export class ProjectRefDto {
  @IsNotEmpty({ message: 'ID is required' })
  id!: number;
}

enum ProjectStatus {
  Initiating = 'Initiating',
  OnTrack = 'OnTrack',
  AtRisk = 'AtRisk',
  Delayed = 'Delayed',
  Pending = 'Pending',
  Completed = 'Completed',
}

export class CreateProjectRequestBodyDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsNumber()
  projectProgress?: number;

  @IsNotEmpty({ message: 'Start date is required' })
  @IsDate()
  startDate!: Date;

  @IsNotEmpty({ message: 'End date is required' })
  @IsDate()
  endDate!: Date;

  @IsNotEmpty({ message: 'OwnerId is required' })
  @ValidateNested()
  @Type(() => UserRefDto)
  owner!: UserRefDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRefDto)
  participants?: UserRefDto[];
}

export class UpdateProjectRequestBodyDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsNumber()
  projectProgress?: number;

  @IsNotEmpty({ message: 'Start date is required' })
  @IsDate()
  startDate!: Date;

  @IsNotEmpty({ message: 'End date is required' })
  @IsDate()
  endDate!: Date;

  @IsNotEmpty({ message: 'OwnerId is required' })
  @ValidateNested()
  @Type(() => UserRefDto)
  owner!: UserRefDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRefDto)
  participants?: UserRefDto[];
}

export class FetchProjectRequestQueryDto {
  @IsNotEmpty({ message: 'Limit is required' })
  @IsNumber({}, { message: 'Limit must be a number' })
  limit!: number;

  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber({}, { message: 'Page must be a number' })
  page!: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsIn(Object.values(ProjectStatus), {
    message: 'Status must be one of the following: ' + Object.values(ProjectStatus).join(', '),
  })
  status?: ProjectStatus;
}
