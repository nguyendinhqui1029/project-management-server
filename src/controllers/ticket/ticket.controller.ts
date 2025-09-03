import { CreateTicketBodyDto, UpdateTicketBodyDto } from '@dto/tickets.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from '@services/ticket/ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  createTicket(@Body() body: CreateTicketBodyDto) {
    return this.ticketService.create(body);
  }

  @Put('/:id')
  updateTicket(@Param('id') id: number, @Body() body: UpdateTicketBodyDto) {
    return this.ticketService.update(id, body);
  }

  @Delete('/:id')
  deleteTicket(@Param('id') id: number) {
    return this.ticketService.delete(id);
  }

  @Get('/:id')
  getTicketById(@Param('id') id: number) {
    return this.ticketService.getTicketById(id);
  }
}
