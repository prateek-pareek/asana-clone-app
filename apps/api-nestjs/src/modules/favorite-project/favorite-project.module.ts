import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteProject, FavoriteProjectSchema } from '../../database/schemas/favorite-project.schema';
import { FavoriteProjectService } from './favorite-project.service';
import { FavoriteProjectResolver } from './favorite-project.resolver';

/**
 * FavoriteProject module for favorite project management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: FavoriteProject.name, schema: FavoriteProjectSchema }])],
  providers: [FavoriteProjectService, FavoriteProjectResolver],
  exports: [FavoriteProjectService],
})
export class FavoriteProjectModule {}
