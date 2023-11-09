import { Test, TestingModule } from '@nestjs/testing';
import { ReviewTypeController } from './review_type.controller';
import { ReviewTypeService } from './review_type.service';

describe('ReviewTypeController', () => {
  let controller: ReviewTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewTypeController],
      providers: [ReviewTypeService],
    }).compile();

    controller = module.get<ReviewTypeController>(ReviewTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
