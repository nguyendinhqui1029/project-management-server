import { Test, TestingModule } from '@nestjs/testing';
import { SprintPlanningController } from './sprint-planning.controller';

describe('SprintPlanningController', () => {
  let controller: SprintPlanningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintPlanningController],
    }).compile();

    controller = module.get<SprintPlanningController>(SprintPlanningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
