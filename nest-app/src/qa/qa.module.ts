import { Module } from '@nestjs/common';
import { QAService } from './qa.service';
import { QAController } from './qa.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QA} from "./entities/qa.entity";
import {JwtService} from "@nestjs/jwt";


@Module({
  imports:[TypeOrmModule.forFeature([QA])],
  exports: [TypeOrmModule],
  controllers: [QAController],
  providers: [QAService,JwtService],
})
export class QAModule {}
