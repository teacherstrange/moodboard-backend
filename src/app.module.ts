import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from 'nestjs-config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import * as path from 'path';

import UserModule from './user/user.module';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: process.env.GRAPHQL_PLAYGROUND === 'true',
    }),
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
