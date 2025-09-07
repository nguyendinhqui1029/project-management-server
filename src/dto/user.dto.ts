import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

enum UserRole {
  Admin = 'Admin',
  PM = 'PM',
  BE = 'BE',
  FE = 'FE',
  QA = 'QA',
  Viewer = 'Viewer',
}

enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export class UserRefDto {
  @IsNotEmpty({ message: 'ID is required' })
  id!: number;
}

export class CreateUserRequestBodyDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password!: string;

  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  fullName!: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(Object.values(UserRole))
  role!: UserRole;
}

export class UpdateUserRequestBodyDto {
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  username?: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  email?: string;

  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(Object.values(UserRole))
  role?: UserRole;

  @IsOptional()
  @IsIn(Object.values(UserStatus), {
    message: 'Status must be one of the following: ' + Object.values(UserStatus).join(', '),
  })
  status?: UserStatus;
}

export class FetchUserRequestQueryDto {
  @IsNotEmpty({ message: 'Limit is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(10, { message: 'Limit must be at least 10' })
  limit!: number;

  @IsNotEmpty({ message: 'Page is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  page!: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsIn(Object.values(UserStatus), {
    message: 'Status must be one of the following: ' + Object.values(UserStatus).join(', '),
  })
  status?: UserStatus;
}
