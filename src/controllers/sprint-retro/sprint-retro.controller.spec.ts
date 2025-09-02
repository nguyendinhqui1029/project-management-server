import { Test, TestingModule } from '@nestjs/testing';
import { SprintRetroController } from './sprint-retro.controller';

describe('SprintRetroController', () => {
  let controller: SprintRetroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintRetroController],
    }).compile();

    controller = module.get<SprintRetroController>(SprintRetroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
