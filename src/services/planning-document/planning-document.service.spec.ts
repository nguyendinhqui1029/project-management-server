import { Test, TestingModule } from '@nestjs/testing';
import { PlanningDocumentService } from './planning-document.service';

describe('PlanningDocumentService', () => {
  let service: PlanningDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningDocumentService],
    }).compile();

    service = module.get<PlanningDocumentService>(PlanningDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
