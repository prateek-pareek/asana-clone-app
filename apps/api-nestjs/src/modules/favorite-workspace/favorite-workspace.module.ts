import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteWorkspace, FavoriteWorkspaceSchema } from '../../database/schemas/favorite-workspace.schema';
import { FavoriteWorkspaceService } from './favorite-workspace.service';
import { FavoriteWorkspaceResolver } from './favorite-workspace.resolver';

/**
 * FavoriteWorkspace module for favorite workspace management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: FavoriteWorkspace.name, schema: FavoriteWorkspaceSchema }])],
  providers: [FavoriteWorkspaceService, FavoriteWorkspaceResolver],
  exports: [FavoriteWorkspaceService],
})
export class FavoriteWorkspaceModule {}
