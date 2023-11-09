import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {SignInDto} from "./signIn.dto";
import {AuthGuard} from "./auth.guard";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
         private readonly usersService: UsersService,
    ) {}

    @Post('login')
    async logIn(@Body() signInDto:SignInDto) {
        const { username, password } = signInDto;
            const user= await this.authService.signIn(username,password);
            return user;
        }

    @UseGuards(AuthGuard)
    @Get('user')
    getProfile(@Request() req) {
        return req.user;
    }


}