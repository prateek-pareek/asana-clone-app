import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchivedActivity, ArchivedActivityDocument } from '../../database/schemas/archived-activity.schema';
import { ArchivedActivityWhereInput } from '../../shared/dto/archived-activity.dto';

/**
 * ArchivedActivity service for archived activity operations
 */
@Injectable()
export class ArchivedActivityService {
  constructor(
    @InjectModel(ArchivedActivity.name)
    private readonly archivedActivityModel: Model<ArchivedActivityDocument>,
  ) {}

  /**
   * Get archived activities by where clause
   */
  async list(where: ArchivedActivityWhereInput): Promise<ArchivedActivity[]> {
    // TODO: Implement workspace filtering
    return this.archivedActivityModel.find({}).exec();
  }
}
