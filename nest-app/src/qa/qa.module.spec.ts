import { Test, TestingModule } from '@nestjs/testing';
import { QAController } from './qa.controller';
import { QAService } from './qa.service';
import * as httpMocks from 'node-mocks-http';
import { Repository } from 'typeorm';
import { QA } from './entities/qa.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { QAModule } from './qa.module';

describe('QA Module', () => {
    let controller: QAController;
    let service: QAService;
    let qaRepository: Repository<QA>;
    let module: TestingModule;
    const qaRepositoryToken = getRepositoryToken(QA);

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [QAModule],
            controllers: [QAController],
            providers: [QAService, JwtService, {
                provide: qaRepositoryToken,
                useValue: qaRepository,
            }],
        }).compile();

        controller = module.get<QAController>(QAController);
        service = module.get<QAService>(QAService);
        qaRepository = module.get<Repository<QA>>(qaRepositoryToken);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });


});
