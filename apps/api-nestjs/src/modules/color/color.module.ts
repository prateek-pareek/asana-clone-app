import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ColorSchema } from '../../database/schemas/color.schema';
import { ColorService } from './color.service';
import { ColorResolver } from './color.resolver';

/**
 * Color module for color management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }])],
  providers: [ColorService, ColorResolver],
  exports: [ColorService],
})
export class ColorModule {}
