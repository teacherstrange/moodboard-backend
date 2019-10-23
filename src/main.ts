import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenvFlow from 'dotenv-flow';

async function bootstrap() {
  dotenvFlow.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
