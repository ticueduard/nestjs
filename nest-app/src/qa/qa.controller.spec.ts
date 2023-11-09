import {Test, TestingModule} from '@nestjs/testing';
import {QAController} from './qa.controller';
import {QAService} from './qa.service';
import * as httpMocks from 'node-mocks-http';
import {QA} from "./entities/qa.entity";
import {DeleteResult, Repository} from "typeorm";
import { getRepositoryToken } from '@nestjs/typeorm';
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";

describe('QAController', () => {
    let controller: QAController;
    let service: QAService;
    let qaRepository: Repository<QA>;
    let qaRepositoryToken: string | Function = getRepositoryToken(QA);


    jest.mock('jsonwebtoken', () => ({
        verify: jest.fn((token, secretOrKey, options, callback) => {
            callback(null, {
                payload: {
                    username: 'testusername',
                    sub: 1,
                },
                header: 'header',
                signature: 'signature',
            });
        }),
    }));
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QAController],
            providers: [QAService,JwtService,{
                provide:qaRepositoryToken ,
                useValue: qaRepository,
            },],


        }).compile();

        controller = module.get<QAController>(QAController);
        service = module.get<QAService>(QAService);
        qaRepository = module.get<Repository<QA>>(qaRepositoryToken);

        service.createQandA = jest.fn();
        service.findOne=jest.fn();
        service.remove=jest.fn();
        service.update=jest.fn();
        service.findQuestionId=jest.fn().mockImplementation((id)=>{return {
            id: id,
            productId: 79,
            question: 'Intrebare52',
            answer: 'nu merges',
            userQuestion: 39,
            userAnswer: 39
        }});
        service.updateQuestion=jest.fn();

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a question', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM5LCJ1c2VybmFtZSI6ImFkbWluMTIiLCJpYXQiOjE2OTg2MDg3MjksImV4cCI6MTY5ODYwOTMyOX0.yE3Bo99aj5tgGS2bRG7AbM1j9ZJis2GEseRHjkuRMQM',
            },
        });

        const createData = {
            productId: '5',
            question: 'string?',
            userQuestion: '7',
        };

        await controller.createQuestion(createData, res,req );


        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Question created' });

    });


    it('should create an answer', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM5LCJ1c2VybmFtZSI6ImFkbWluMTIiLCJpYXQiOjE2OTg2MTE5NzEsImV4cCI6MTY5ODYxMjEyMX0.yM99dkTBi-vAx-M15cLLqenuyBmsB_CZmE5s5OrGeWs',
            },
            params: {
                id: 24,
            },
        });
        const id = Number(req.params.id);
        const updateData = {
            answer: 'new answer',
            userAnswer: '6',
        };


        const result=await controller.createAnswer(id, updateData, res, req);
        console.log(result);

        expect(service.findQuestionId).toHaveBeenCalledWith(req.params.id);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Answer created' });
    });






    it('should update a question/answer', async () => {
        const res = httpMocks.createResponse();
        const id = '13';
        const updateData = {
            question:"string",
            answer:"string",
            userQuestion:"4",
            userAnswer:"6",
        };
        await controller.update(id, updateData, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: ' Question/Answer updated ' });

    });


    it('should be defined remove', async () => {
        const res = httpMocks.createResponse();
        const id = '12';

        // Mock the service's remove method to return a resolved promise with a DeleteResult.
        const deleteResult: DeleteResult = {
            raw: [],  // If you don't have a specific value for `raw`, you can use an empty array.
            affected: 1,  // You can adjust the affected count based on your test case.
        };
        jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);
        await controller.remove(id, res);

        expect(service.remove).toHaveBeenCalledWith(12);


        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: ' Question/Answer deleted ' });
    });



    it('should be defined findOne', async () => {
        const res = httpMocks.createResponse();
        const id = '12';

        jest.spyOn(service, 'findOne').mockImplementation();

        await controller.findOne(id, res);

        expect(res.statusCode).toBe(200);
    });






});
