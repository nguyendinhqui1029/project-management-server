import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProjectRefDto } from '@dto/project.dto';
import { TicketRefDto } from '@dto/tickets.dto';

export class TicketBoardRefDto {
  @IsNotEmpty({ message: 'Board ID is required' })
  id!: number;
}

export class CreateTicketBoardBodyDto {
  @ValidateNested()
  @Type(() => ProjectRefDto)
  project!: ProjectRefDto;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => TicketRefDto)
  tickets?: TicketRefDto[];
}

export class UpdateTicketBoardBodyDto {
  @ValidateNested()
  @Type(() => ProjectRefDto)
  project!: ProjectRefDto;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => TicketRefDto)
  tickets?: TicketRefDto[];
}

export class FetchTicketBoardRequestQueryDto {
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
  @IsString()
  project?: string;
}
