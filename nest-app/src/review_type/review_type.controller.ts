import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ReviewTypeService} from './review_type.service';
import {CreateReviewTypeDto} from './dto/create-review_type.dto';
import {UpdateReviewTypeDto} from './dto/update-review_type.dto';
import {Request, Response} from "express";
import {AuthGuard} from "../auth/auth.guard";

@Controller('review-type')
export class ReviewTypeController {
    constructor(private readonly reviewTypeService: ReviewTypeService) {
    }
    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createReviewTypeDto: CreateReviewTypeDto,@Req() req: Request, @Res() res: Response) {
        try {
            const createReviewType = await this.reviewTypeService.create(createReviewTypeDto);
            res.status(HttpStatus.OK).json({message:"Review type created",data:[createReviewType]});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string,@Req() req: Request, @Res() res: Response) {
        try {
            const reviewType = await this.reviewTypeService.findOne(+id);
            res.status(HttpStatus.OK).json(reviewType);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Req() req: Request, @Res() res: Response) {
        try {
            const reviewTypes = await this.reviewTypeService.findAll();
            res.status(HttpStatus.OK).json(reviewTypes);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateReviewTypeDto: UpdateReviewTypeDto,@Req() req: Request, @Res() res: Response) {
        try {
            const reviewTypeUpdate = await this.reviewTypeService.update(+id, updateReviewTypeDto);
          res.status(HttpStatus.OK).json({message: 'Review type updated successfully', data: reviewTypeUpdate});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        try {
            await this.reviewTypeService.remove(+id);
            res.status(HttpStatus.OK).json({message: 'Review type deleted'});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }

    }
}