import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mention, MentionSchema } from '../../database/schemas/mention.schema';
import { MentionService } from './mention.service';
import { MentionResolver } from './mention.resolver';

/**
 * Mention module for mention management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Mention.name, schema: MentionSchema }])],
  providers: [MentionService, MentionResolver],
  exports: [MentionService],
})
export class MentionModule {}
