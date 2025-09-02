import { Test, TestingModule } from '@nestjs/testing';
import { TicketBoardController } from './ticket-board.controller';

describe('TicketBoardController', () => {
  let controller: TicketBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketBoardController],
    }).compile();

    controller = module.get<TicketBoardController>(TicketBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
