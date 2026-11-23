import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { typeOrmConfig } from './config/typeorm.config.js';
import { TagModule } from './tag/tag.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TagModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Validates every DTO in the app. Registered here (not in main.ts)
      // so e2e tests that build AppModule get the same validation.
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // Drop fields the DTO doesn't declare (e.g. "id" or "bio" in sign-up).
        whitelist: true,
        // RealWorld answers validation errors with 422, not Nest's default 400.
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    },
  ],
})
export class AppModule {}
