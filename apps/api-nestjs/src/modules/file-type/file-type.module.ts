import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileType, FileTypeSchema } from '../../database/schemas/file-type.schema';
import { FileTypeService } from './file-type.service';
import { FileTypeResolver } from './file-type.resolver';

/**
 * FileType module for file type management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: FileType.name, schema: FileTypeSchema }])],
  providers: [FileTypeService, FileTypeResolver],
  exports: [FileTypeService],
})
export class FileTypeModule {}
