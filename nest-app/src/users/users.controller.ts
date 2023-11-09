import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ProfileService} from "../profile/profile.service";
import {CreateProfileDto} from '../profile/dto/create-profile.dto';
import {Request, Response} from "express";
import {UpdateProfileDto} from "../profile/dto/update-profile.dto";
import {Pagination} from "../paginate/pagination";
import {User} from "./entities/user.entity";
import {PaginationOptionsInterface} from "../paginate/pagination.option";
import {AuthGuard} from "../auth/auth.guard";






@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private readonly profileService: ProfileService,) {
    }




    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Body() createProfileDto: CreateProfileDto, @Req() req: Request,@Res() res: Response) {
        try {
            const userExist = await this.usersService.findUsername(createUserDto.username);
            const emailExist = await this.usersService.findEmail(createUserDto.email);

            console.log(createUserDto.username);
            console.log(createUserDto.email);

            if (userExist || emailExist) {
                throw new Error('Username or email already exists.');
            } else {
                const newUser = await this.usersService.create(createUserDto)

                const userId = newUser.id;
                createProfileDto.userId = userId;
                const profile = await this.profileService.create(createProfileDto);

                res.status(HttpStatus.CREATED).json({ message: 'Registration successful', newUser });
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }


    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Body() createProfileDto: CreateProfileDto, @Req() req: Request, @Res() res: Response) {
        try {
            const userExist = await this.usersService.findUsername(createUserDto.username);
            const emailExist = await this.usersService.findEmail(createUserDto.email);


            if (userExist || emailExist) {
                throw new Error('Username or email already exists.');
            }else {
                const user = await this.usersService.create(createUserDto)
                if (!user) {
                    throw new Error("Error for user")
                }
                const usersId = user.id;
                createProfileDto.userId = usersId;
                const profile = await this.profileService.create(createProfileDto);
                if (!profile) {
                    throw new Error("Error for profile")
                }
                res.status(HttpStatus.OK).json({
                    user: user
                });
            }} catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});

        }

    }
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Res() res: Response, @Req() req: Request) {
        try {
            const limit: number = req.query.hasOwnProperty('limit') ? parseInt(req.query.limit as string, 10) : 10;
            const page: number = req.query.hasOwnProperty('page') ? parseInt(req.query.page as string, 10) : 0;

            const options: PaginationOptionsInterface = {
                limit,
                page,
            };

            const users = await this.usersService.findAll(options);

            res.status(HttpStatus.OK).json(users);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        try {
            const user = await this.usersService.findOne(+id);
            const profile = await this.profileService.findOneByUserId(+id)
            if (!user || !profile) {
                throw new Error('User not found');
            } else {
                res.status(HttpStatus.OK).json({
                    User: user,
                    Profile: profile
                });
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() data: { user: UpdateUserDto, profile: UpdateProfileDto },
        @Res() res: Response
    ) {
        try {
            const { user, profile } = data;
            console.log(data.user);
            console.log(data.profile);


            const updatedUser = await this.usersService.update(+id, user);


            const updatedProfile = await this.profileService.updateProfileByUserId(+id, profile);


            res.status(HttpStatus.OK).json({
                message: 'User and profile succesfull updated',
                user: updatedUser,
                profile: updatedProfile
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }



    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        try {
            const user = await this.usersService.remove(+id);

                res.status(HttpStatus.OK).json({
                    message:"User deleted",
                    userDeleted:user
                });

        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
        }
    }


}
