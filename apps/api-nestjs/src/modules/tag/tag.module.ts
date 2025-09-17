import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from '../../database/schemas/tag.schema';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';

/**
 * Tag module for tag management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  providers: [TagService, TagResolver],
  exports: [TagService],
})
export class TagModule {}
