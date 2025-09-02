import { Test, TestingModule } from '@nestjs/testing';
import { SprintPlanningService } from './sprint-planning.service';

describe('SprintPlanningService', () => {
  let service: SprintPlanningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SprintPlanningService],
    }).compile();

    service = module.get<SprintPlanningService>(SprintPlanningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
