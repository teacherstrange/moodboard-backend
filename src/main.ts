import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenvFlow from 'dotenv-flow';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenvFlow.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const error = errors[0];
      return new BadRequestException({
        statusCode: 400,
        property: error.property,
        message: error.constraints[Object.keys(error.constraints)[0]],
      });
    },
  }));
  await app.listen(3000);
}
bootstrap();
