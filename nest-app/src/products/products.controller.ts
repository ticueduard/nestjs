import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    Res,
    UploadedFiles, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Request, Response} from "express";
import {ImagesService} from '../images/images.service';
import {FilesInterceptor} from "@nestjs/platform-express";
import {storage} from "./multerConfig";
import {ProductAttributesService} from "../product_attributes/product_attributes.service";
import {CreateProductAttributeDto} from "../product_attributes/dto/create-product_attribute.dto";
import {PaginationOptionsInterface} from "../paginate/pagination.option";
import {AuthGuard} from "../auth/auth.guard";


@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly imagesService: ImagesService,
        private readonly attributeService: ProductAttributesService
    ) {
    }

    //@ts-ignore
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('images', 7, {storage}))
    @Post()
    async create(
        @Body() createProductDto: CreateProductDto, createProductAttributeDto: CreateProductAttributeDto,
        @Body('attribute') attrName: string,
        @Req() req: Request,
        @Res() res: Response,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        try {

            if (isNaN(createProductDto.price) || createProductDto.price < 0) {
                throw new Error('Price must be a positive number.');
            }

            if (!Array.isArray(images) || images.length === 0) {
                throw new Error("No images found");
            }

            console.log(images);
            const existProduct = await this.productsService.isProductUnique(createProductDto.name);
            if (existProduct) {
                throw new Error("Product already exists");
            } else {

                console.log(createProductDto.price);
                const createdProduct = await this.productsService.createProduct(createProductDto);

                const productId = createdProduct.id;

                const createdImages = [];

                for (const img of images) {
                    const createImageDto: { imagePath: string, productId: number } = {
                        imagePath: img.originalname,
                        productId: productId,
                    };

                    const createdImage = await this.imagesService.createImage(createImageDto);
                    createdImages.push(createdImage);
                }

                if (createdImages.length === 0) {
                    throw new Error("No images found");
                }

                const createdAttributes = [];
                for (const attribute of attrName) {
                    const createProductAttributeDto = new CreateProductAttributeDto();
                    createProductAttributeDto.productId = productId;
                    createProductAttributeDto.attrName = attribute;

                    const createdAttribute = await this.attributeService.create(createProductAttributeDto);
                    createdAttributes.push(createdAttribute);
                }

                res.status(HttpStatus.CREATED).json({
                    message: 'Product added successfully',
                    data: [createdProduct, createdImages]
                });
            }
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }


    @Get()
    async findAll(@Req() req: Request,
                  @Res() res: Response,
    ) {
        try {
            const limit: number = req.query.hasOwnProperty('limit') ? parseInt(req.query.limit as string, 10) : 10;
            const page: number = req.query.hasOwnProperty('page') ? parseInt(req.query.page as string, 10) : 0;

            const options: PaginationOptionsInterface = {
                limit,
                page,
            };

            const allProducts = await this.productsService.getAllProducts(options);
            console.log(allProducts);
            res.status(HttpStatus.OK).json([allProducts]);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }


    @Get(':id')
    async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        try {
            const product = await this.productsService.getProductId(+id);
            if (!product) {
                throw new Error("Product not found");
            } else {
                res.status(HttpStatus.OK).json({
                    product: product,
                });
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('images', 7, {storage}))
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @Req() req: Request,
        @Res() res: Response,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        try {
            const updatedProduct = await this.productsService.updateProduct(+id, updateProductDto);

            const productId = +id;
            const updatedImages = [];

            if (images && images.length > 0) {
                //TODO replace for with map
                for (const img of images) {
                    const updateImageDto: { imagePath: string, productId: number } = {
                        imagePath: img.originalname,
                        productId: productId,
                    };

                    const updatedImage = await this.imagesService.updateImage(+id, updateImageDto);
                    updatedImages.push(updatedImage);
                }
            }

            res.status(HttpStatus.OK).json({message: 'Product updated successfully'});
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        try {
            const product = await this.productsService.getProductId(+id);
            if (!product) {
                throw  new Error('Product not found')
                return;
            }


            const deletedProduct = await this.productsService.deleteProduct(+id);

            res.status(HttpStatus.OK).json({
                message: 'Product deleted successfully',
                data: deletedProduct,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

}
