import { Global, Module } from '@nestjs/common';
import { dbProvider, DB } from './db.provider';

@Global()
@Module({
  providers: [dbProvider],
  exports: [DB]
})
export class DatabaseModule {} 