import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Profile} from "../profile/entities/profile.entity";
import {ProfileService} from "../profile/profile.service";
import {AuthController} from "../auth/auth.controller";
import {AuthService} from "../auth/auth.service";





@Module({
  imports:[TypeOrmModule.forFeature([User,Profile])],


  exports: [TypeOrmModule],
  controllers: [UsersController,AuthController],
  providers: [UsersService,ProfileService,AuthService],
})
export class UsersModule {}
