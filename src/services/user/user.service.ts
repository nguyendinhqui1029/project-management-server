import { UserEntity } from '@entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserRequestBodyDto,
  FetchUserRequestQueryDto,
  UpdateUserRequestBodyDto,
} from '@dto/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  create(data: CreateUserRequestBodyDto) {
    const product = this.userRepo.create(data);
    return this.userRepo.save(product);
  }

  update(id: number, data: UpdateUserRequestBodyDto) {
    return this.userRepo.update({ id: id }, data);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }

  getUserById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async getAllUser(queryParams: FetchUserRequestQueryDto) {
    const { page = 1, limit = 10, ...filters } = queryParams;
    const [filterResult, totalFilterCount] = await this.userRepo.findAndCount({
      where: { ...filters },
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });
    return {
      filterResult,
      totalFilterCount,
    };
  }
}
