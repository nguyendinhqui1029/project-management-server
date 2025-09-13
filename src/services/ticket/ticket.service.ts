import { CreateTicketBodyDto, UpdateTicketBodyDto } from '@dto/tickets.dto';
import { TicketEntity } from '@entities/tickets.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketEntityRepo: Repository<TicketEntity>,
  ) {}

  create(data: CreateTicketBodyDto) {
    const ticket = this.ticketEntityRepo.create(data);
    return this.ticketEntityRepo.save(ticket);
  }

  update(id: number, data: UpdateTicketBodyDto) {
    return this.ticketEntityRepo.update({ id: id }, data);
  }

  delete(id: number) {
    return this.ticketEntityRepo.delete(id);
  }

  async getTicketById(id: number) {
    const result = this.ticketEntityRepo.findOne({
      where: { id },
      relations: ['todos', 'assignee', 'reporter', 'sprint', 'board'],
    });
    return result;
  }
}
