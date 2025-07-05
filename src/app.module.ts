import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/db.module';
import { CustomerModule } from './api/customers/customer.module';
import { EntryModule } from './api/entries/entry.module';
import { ConceptModule } from './api/concepts/concept.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CustomerModule,
    EntryModule,
    ConceptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}