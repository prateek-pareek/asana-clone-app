import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Icon, IconSchema } from '../../database/schemas/icon.schema';
import { IconService } from './icon.service';
import { IconResolver } from './icon.resolver';

/**
 * Icon module for icon management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Icon.name, schema: IconSchema }])],
  providers: [IconService, IconResolver],
  exports: [IconService],
})
export class IconModule {}
