import { Type } from 'class-transformer';
import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProjectRefDto } from '@dto/project.dto';
import { UserRefDto } from '@dto/user.dto';
import { TicketBoardRefDto } from '@dto/ticket-board.dto';

export class SprintRefDto {
  @IsNotEmpty({ message: 'Sprint ID is required' })
  id!: number;
}

export class CreateSprintBodyDto {
  @ValidateNested()
  @Type(() => TicketBoardRefDto)
  board!: TicketBoardRefDto;

  @ValidateNested()
  @Type(() => ProjectRefDto)
  sprint!: ProjectRefDto;

  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title!: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description!: string;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString()
  type!: string;

  @IsNotEmpty({ message: 'Priority is required' })
  @IsString()
  priority!: string;

  @IsNotEmpty({ message: 'Assignee is required' })
  @ValidateNested()
  @Type(() => UserRefDto)
  assignee!: UserRefDto;

  @IsNotEmpty({ message: 'Reporter is required' })
  @ValidateNested()
  @Type(() => UserRefDto)
  reporter!: UserRefDto;

  @IsOptional()
  @IsNumber({}, { message: 'Estimate must be a number' })
  estimate?: number;
}

export class UpdateSprintBodyDto {
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
}

export class FetchSprintRequestQueryDto {
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
