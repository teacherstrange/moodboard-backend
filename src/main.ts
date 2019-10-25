import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenvFlow from 'dotenv-flow';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenvFlow.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
