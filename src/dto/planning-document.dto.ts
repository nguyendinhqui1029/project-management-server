import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { UserRefDto } from '@dto/user.dto';
import { ProjectRefDto } from '@dto/project.dto';

export class PlanningDocumentVersionRefDto {
  @IsNotEmpty({ message: 'Planning Document Version ID is required' })
  id!: number;
}

export class PlanningDescriptionRefDto {
  @IsNotEmpty({ message: 'Planning Description ID is required' })
  id!: number;
}

export class PlanningDocumentRefDto {
  @IsNotEmpty({ message: 'Planning Document ID is required' })
  id!: number;
}
export class CreatePlanningDocumentBodyDto {
  @ValidateNested()
  @Type(() => ProjectRefDto)
  project!: ProjectRefDto;

  @IsOptional()
  @IsString()
  title!: string;

  @ValidateNested()
  @Type(() => UserRefDto)
  createdBy!: UserRefDto;

  @ValidateNested()
  @Type(() => UserRefDto)
  updatedBy?: UserRefDto;
}

export class UpdatePlanningDocumentBodyDto {
  @ValidateNested()
  @Type(() => ProjectRefDto)
  project!: ProjectRefDto;

  @IsOptional()
  @IsString()
  title!: string;

  @ValidateNested()
  @Type(() => UserRefDto)
  createdBy!: UserRefDto;

  @ValidateNested()
  @Type(() => UserRefDto)
  updatedBy?: UserRefDto;
}

export class FetchPlanningDocumentRequestQueryDto {
  @IsNotEmpty({ message: 'Limit is required' })
  @IsNumber({}, { message: 'Limit must be a number' })
  limit!: number;

  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber({}, { message: 'Page must be a number' })
  page!: number;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsString()
  title?: string;

}