import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/db.module';
import { CustomerModule } from './api/customers/customer.module';
import { EntryModule } from './api/entries/entry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CustomerModule,
    EntryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}