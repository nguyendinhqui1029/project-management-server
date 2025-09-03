import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserRefDto } from '@dto/user.dto';
import { TicketBoardRefDto } from '@dto/ticket-board.dto';
import { SprintRefDto } from './sprint.dto';

export class TicketRefDto {
  @IsNotEmpty({ message: 'Ticket ID is required' })
  id!: number;
}

export class CreateTicketBodyDto {
  @ValidateNested()
  @Type(() => TicketBoardRefDto)
  board!: TicketBoardRefDto;

  @ValidateNested()
  @Type(() => SprintRefDto)
  sprint?: SprintRefDto;

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

export class UpdateTicketBodyDto {
  @ValidateNested()
  @Type(() => TicketBoardRefDto)
  board!: TicketBoardRefDto;

  @ValidateNested()
  @Type(() => SprintRefDto)
  sprint?: SprintRefDto;

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

export class FetchTicketRequestQueryDto {
  @IsNotEmpty({ message: 'Limit is required' })
  @IsNumber({}, { message: 'Limit must be a number' })
  limit!: number;

  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber({}, { message: 'Page must be a number' })
  page!: number;

  @IsOptional()
  @IsString()
  board?: string;

  @IsOptional()
  @IsString()
  sprint?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  assignee?: string;

  @IsOptional()
  @IsString()
  reporter?: string;
}
