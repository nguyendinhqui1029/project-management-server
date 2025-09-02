import { Test, TestingModule } from '@nestjs/testing';
import { PlanningDescriptionsService } from './planning-descriptions.service';

describe('PlanningDescriptionsService', () => {
  let service: PlanningDescriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningDescriptionsService],
    }).compile();

    service = module.get<PlanningDescriptionsService>(PlanningDescriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
