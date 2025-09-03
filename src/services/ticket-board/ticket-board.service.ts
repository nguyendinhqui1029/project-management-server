import { CreateTicketBoardBodyDto, UpdateTicketBoardBodyDto } from '@dto/ticket-board.dto';
import { TicketBoardEntity } from '@entities/ticket-board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketBoardService {
  constructor(
    @InjectRepository(TicketBoardEntity)
    private readonly ticketBoardEntityRepo: Repository<TicketBoardEntity>,
  ) {}

  create(data: CreateTicketBoardBodyDto) {
    const ticketBoard = this.ticketBoardEntityRepo.create(data);
    return this.ticketBoardEntityRepo.save(ticketBoard);
  }

  update(id: number, data: UpdateTicketBoardBodyDto) {
    return this.ticketBoardEntityRepo.update({ id: id }, data);
  }

  delete(id: number) {
    return this.ticketBoardEntityRepo.delete(id);
  }

  async getTicketBoardById(id: number) {
    const result = this.ticketBoardEntityRepo.findOne({
      where: { id },
      relations: ['project', 'tickets'],
    });
    return result;
  }
}
