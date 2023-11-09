import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ProductReviewService} from './product-review.service';
import {CreateProductReviewDto} from './dto/create-product-review.dto';
import {UpdateProductReviewDto} from './dto/update-product-review.dto';
import {request, Request, Response} from "express";
import {PaginationOptionsInterface} from "../paginate/pagination.option";
import {AuthGuard} from "../auth/auth.guard";
import {AuthService} from "../auth/auth.service";
import jwt from "jsonwebtoken"
import { JwtService } from '@nestjs/jwt';







@Controller('product-review')
export class ProductReviewController {
    constructor(private readonly productReviewService: ProductReviewService,
                private readonly authService: AuthService,
                private readonly jwtService: JwtService,
    ) {
    }


    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createProductReviewDto: CreateProductReviewDto,
                 @Req() req: Request,
                 @Res() res: Response,) {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        const decodedToken = this.jwtService.decode(token);
        const userId = decodedToken.sub;

        // console.log(userId);
        // console.log(decodedToken);
        // console.log(req.headers);
        // console.log(type);
        // console.log(token);
        try {
            createProductReviewDto.userId=userId;
            const review = await this.productReviewService.create(createProductReviewDto);
            res.status(HttpStatus.OK).json(review);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @Get()
    async findAll(@Res() res: Response, @Req() req: Request) {
        try {
            const limit: number = req.query.hasOwnProperty('limit') ? parseInt(req.query.limit as string, 10) : 10;
            const page: number = req.query.hasOwnProperty('page') ? parseInt(req.query.page as string, 10) : 0;

            const options: PaginationOptionsInterface = {
                limit,
                page,
            };
            const reviews = await this.productReviewService.findAll(options);
            res.status(HttpStatus.OK).json(reviews);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        try {
            const oneReview = await this.productReviewService.findOne(+id);
            res.status(HttpStatus.OK).json(oneReview);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProductReviewDto: UpdateProductReviewDto, @Res() res: Response) {
        try {
            const reviewUpdate = await this.productReviewService.update(+id, updateProductReviewDto);
            res.status(HttpStatus.OK).json(reviewUpdate);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        try {
            const reviewDelete = await this.productReviewService.remove(+id);
            res.status(HttpStatus.OK).json(reviewDelete);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }
}
