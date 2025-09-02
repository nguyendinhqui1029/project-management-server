import { Test, TestingModule } from '@nestjs/testing';
import { PlanningDocumentVersionService } from './planning-document-version.service';

describe('PlanningDocumentVersionService', () => {
  let service: PlanningDocumentVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningDocumentVersionService],
    }).compile();

    service = module.get<PlanningDocumentVersionService>(PlanningDocumentVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
