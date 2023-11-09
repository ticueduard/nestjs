import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';

import {UsersController} from "../users/users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Profile} from "./entities/profile.entity";
import {UsersService} from "../users/users.service";

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile])],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [ProfileService,UsersService],
})
export class ProfileModule {}
