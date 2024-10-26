import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConnectionProviders } from './database.connection.providers';
import { databaseModelsProviders } from './database.model.providers';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })], // Sử dụng ConfigModule nạp biến môi trường
  providers: [...databaseConnectionProviders, ...databaseModelsProviders],
  exports: [...databaseConnectionProviders, ...databaseModelsProviders],
})
export class DatabaseModule {}
