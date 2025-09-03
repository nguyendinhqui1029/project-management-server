import { CreateTicketBoardBodyDto, UpdateTicketBoardBodyDto } from '@dto/ticket-board.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TicketBoardService } from '@services/ticket-board/ticket-board.service';

@Controller('ticket-board')
export class TicketBoardController {
  constructor(private readonly ticketBoardService: TicketBoardService) {}

  @Post()
  createTicketBoard(@Body() body: CreateTicketBoardBodyDto) {
    return this.ticketBoardService.create(body);
  }

  @Put('/:id')
  updateTicketBoard(@Param('id') id: number, @Body() body: UpdateTicketBoardBodyDto) {
    return this.ticketBoardService.update(id, body);
  }

  @Delete('/:id')
  deleteTicketBoard(@Param('id') id: number) {
    return this.ticketBoardService.delete(id);
  }

  @Get('/:id')
  getTicketBoardById(@Param('id') id: number) {
    return this.ticketBoardService.getTicketBoardById(id);
  }
}
