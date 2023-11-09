import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {Req, Request, Res, Response, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const port= process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.use('*',(req, res, next)=>{
      req.user = [];
      next()
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
