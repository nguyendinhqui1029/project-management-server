import { Test, TestingModule } from '@nestjs/testing';
import { PlanningDocumentController } from './planning-document.controller';

describe('PlanningDocumentController', () => {
  let controller: PlanningDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanningDocumentController],
    }).compile();

    controller = module.get<PlanningDocumentController>(PlanningDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
