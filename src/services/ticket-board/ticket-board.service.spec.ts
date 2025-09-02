import { Test, TestingModule } from '@nestjs/testing';
import { TicketBoardService } from './ticket-board.service';

describe('TicketBoardService', () => {
  let service: TicketBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketBoardService],
    }).compile();

    service = module.get<TicketBoardService>(TicketBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
