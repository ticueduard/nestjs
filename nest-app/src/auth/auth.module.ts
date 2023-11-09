import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";
import { ConfigModule } from '@nestjs/config';
import {AuthGuard} from "./auth.guard";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET,
            signOptions: { expiresIn: '600s' },
        }),
        UsersModule
    ],
    providers: [UsersService,AuthService,AuthGuard],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
