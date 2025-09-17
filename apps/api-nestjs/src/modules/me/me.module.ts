import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Me, MeSchema } from '../../database/schemas/me.schema';
import { MeService } from './me.service';
import { MeResolver } from './me.resolver';

/**
 * Me module for user profile management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Me.name, schema: MeSchema }])],
  providers: [MeService, MeResolver],
  exports: [MeService],
})
export class MeModule {}
