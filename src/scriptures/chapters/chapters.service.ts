import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Chapter, ChapterDocument} from './chapter';

@Injectable()
export class ChaptersService {
  constructor(@InjectModel(Chapter.name) private model: Model<ChapterDocument>) {
  }

  async createOrUpdate(filter = {}, model: Chapter) {
    return this.model.findOneAndUpdate(filter, model, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async find(filter = {}) {
    return this.model.find(filter)
        .populate('bible')
        .populate('book')
        .sort('bookIndex number');
  }

  async findById(id) {
    return this.model.findById(id)
      .populate('bible')
      .populate('book');
  }

  async findOne(filter = {}) {
    return this.model.findOne(filter)
      .populate('bible')
      .populate('book');
  }

  async count(filter = {}) {
    return this.model.count(filter);
  }

  async delete(filter = {}): Promise<any> {
    return this.model.deleteMany(filter);
  }
}
