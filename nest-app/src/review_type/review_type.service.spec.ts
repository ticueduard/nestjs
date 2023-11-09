import { Test, TestingModule } from '@nestjs/testing';
import { ReviewTypeService } from './review_type.service';

describe('ReviewTypeService', () => {
  let service: ReviewTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewTypeService],
    }).compile();

    service = module.get<ReviewTypeService>(ReviewTypeService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
