import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import {QAService} from './qa.service';
import {CreateQADto,} from './dto/create-qa.dto';
import {UpdateQADto} from './dto/update-qa.dto';
import {Request, Response} from "express";
import {AuthGuard} from "../auth/auth.guard";
import {UpdateToQuestionDto} from "./dto/updateToQuestion.dto";
import {JwtService} from '@nestjs/jwt';

@Controller('qa')
export class QAController {
    constructor(private readonly qAService: QAService,
                private readonly jwtService: JwtService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async createQuestion(@Body() createQADto: CreateQADto, @Res() res: Response, @Req() req: Request) {
        try {
            const {productId, question} = createQADto;
            const [type, token] = req.headers.authorization?.split(' ') ?? [];
            const decodedToken = this.jwtService.decode(token);
            const userQuestion = decodedToken.sub;

            const newQuestion = await this.qAService.createQandA({productId, question, userQuestion});
            res.status(HttpStatus.OK).json({message: "Question created", data: newQuestion});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }


    @UseGuards(AuthGuard)
    @Post(':id')
    async createAnswer(@Param('id') id: number, @Body() updateToQuestionDto: UpdateToQuestionDto,
                       @Res() res: Response,
                       @Req() req) {
        try {
            const existingQuestion = await this.qAService.findQuestionId(id);
            // const [type, token] = req.headers.authorization?.split(' ') ?? [];
            // const decodedToken = this.jwtService.decode(token);

            console.log("existingQuestion");
            console.log(existingQuestion);
            console.log("id");
            console.log(id);

            console.log("userid-token");
            console.log(req.user);


            // console.log('req.user');
            // console.log(req.locals.user);

            if (existingQuestion && typeof req.user !== 'undefined') {
                existingQuestion.answer = updateToQuestionDto.answer;
                existingQuestion.userAnswer = req.user.sub;

                console.log(existingQuestion.answer);
                console.log(existingQuestion.userAnswer);
                console.log(existingQuestion.id);


                await this.qAService.updateQuestion(existingQuestion);

                res.status(HttpStatus.OK).json({message: "Answer created"});
            } else {
                throw new Error("Question not found.");
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }


    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        try {
            const oneQA = await this.qAService.findOne(+id);
            res.status(HttpStatus.OK).json({message: " Question/Answer ", data: oneQA});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateQADto: UpdateQADto, @Res() res: Response) {
        try {
            await this.qAService.update(+id, updateQADto);
            res.status(HttpStatus.OK).json({message: " Question/Answer updated "});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.qAService.remove(+id);
            res.status(HttpStatus.OK).json({message: " Question/Answer deleted "});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }
}
