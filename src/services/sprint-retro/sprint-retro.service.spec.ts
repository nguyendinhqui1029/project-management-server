import { Test, TestingModule } from '@nestjs/testing';
import { SprintRetroService } from './sprint-retro.service';

describe('SprintRetroService', () => {
  let service: SprintRetroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SprintRetroService],
    }).compile();

    service = module.get<SprintRetroService>(SprintRetroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
