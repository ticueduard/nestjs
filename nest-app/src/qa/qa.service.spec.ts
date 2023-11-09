import {Test, TestingModule} from '@nestjs/testing';
import {QAService} from './qa.service';
import {QA} from "./entities/qa.entity";
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from "typeorm";


describe('QaService', () => {
    let service: QAService;
    let qaRepository: Repository<QA>;
    let qaRepositoryToken: string | Function = getRepositoryToken(QA);


    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [QAService, {
                provide: qaRepositoryToken,
                useValue: {
                    save: jest.fn(),
                    findOne: jest.fn(),
                    update: jest.fn().mockImplementation((id, update) => {
                        return {
                            affected: jest.fn().mockImplementation((id) => {
                                if (id === 1) {
                                    return 0;
                                } else {
                                    return 1;
                                }
                            })
                        }
                    }),
                    find: jest.fn(),
                    delete: jest.fn().mockImplementation((id) => {
                        return {
                            affected: jest.fn().mockImplementation((id) => {
                                if (id === 1) {
                                    return 0;
                                } else {
                                    return 1;
                                }
                            })
                        }
                    }),

                }

            },],
        }).compile();

        service = module.get<QAService>(QAService);
        qaRepository = module.get<Repository<QA>>(qaRepositoryToken);


    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it('should create a question ', async () => {
        const createQADto = {
            productId: '86',
            question: 'test?',
            userQuestion: '4',
        };
        const result = jest.spyOn(service, 'createQandA');
        await service.createQandA(createQADto);
        expect(result).toBeCalledWith(createQADto);


    });

    it('should create a  answer', async () => {
        const updateToQuestionDto = {
            productId: '86',
            answer: "string",
            userAnswer: "string"
        };

        const expectedQuestion = new QA();
        expectedQuestion.productId = updateToQuestionDto.productId;
        expectedQuestion.answer = updateToQuestionDto.answer;
        expectedQuestion.userAnswer = updateToQuestionDto.userAnswer;


        const result = jest.spyOn(service, 'updateQuestion');
        await service.updateQuestion(expectedQuestion);
        expect(result).toBeCalledWith(updateToQuestionDto);


    });


    it('should be find a question by id', async () => {
        const id = 2;
        const result = jest.spyOn(service, 'findOne');
        await service.findOne(id);

        expect(result).toBeCalledWith(id);
    });

    it('should find a QA by ID', async () => {
        const id = 24;
        const mockQA = new QA();
        mockQA.id = id;
        jest.spyOn(qaRepository, 'findOne').mockResolvedValue(mockQA);

        const result = await service.findQuestionId(id);

        expect(qaRepository.findOne).toHaveBeenCalledWith({ where: { id } });


        expect(result).not.toBeNull();

    });


    it('should be update a QandA', async () => {
        const id = 45;
        const updateDto = {
            question: "string test?",
            answer: "string answer",
            userQuestion: "5",
            userAnswer: "7",
        }

        const result = jest.spyOn(service, 'update');
        await service.update(id, updateDto);
        expect(result).toBeCalledWith(id, updateDto);


    });

    it('should be error on update a QandA', async () => {
        const id = 1;
        const updateDto = {
            question: "string test?",
            answer: "string answer",
            userQuestion: "5",
            userAnswer: "7",
        }

        jest.spyOn(qaRepository, 'update').mockImplementation(() => {
            throw new Error("Failed to update the question and answer.");
        });

        try {
            await service.update(id, updateDto);
        } catch (error) {
            expect(error.message).toBe("Failed to update the question and answer.");
        }
    });

    it('should remove a QA successfully', async () => {
        const id = 24;
        const result = jest.spyOn(service, 'remove');
        await service.remove(id);

        expect(result).toHaveBeenCalledWith(id);

    });

    it('should be a error for remove a QA successfully', async () => {
        const id = 1;
        jest.spyOn(qaRepository, 'delete').mockImplementation(() => {
            throw new Error("Failed to delete the question and answer.");
        });

        try {
            await service.remove(id);
        } catch (error) {
            expect(error.message).toBe("Failed to delete the question and answer.");
        }
    });


    it('should be return all q and a', async () => {
        const result = jest.spyOn(service, 'findAll');
        await service.findAll();
        expect(result).toHaveBeenCalled();
    });

    it('should be return one q and a', async () => {
        const result = jest.spyOn(service, 'findAll');
        await service.findAll();
        expect(result).toHaveBeenCalled();
    });


});
