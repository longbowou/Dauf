import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Book, BookDocument} from './book';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private model: Model<BookDocument>) {
  }

  async createOrUpdate(filter, model: Book) {
    return this.model.findOneAndUpdate(filter, model, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async find(filter = {}) {
    return this.model.find(filter)
      .populate('bible')
      .sort('index');
  }

  async findOne(filter = {}) {
    return this.model.findOne(filter)
      .populate('bible');
  }

  async count(filter = {}) {
    return this.model.count(filter);
  }

  async delete(filter = {}): Promise<any> {
    return this.model.deleteMany(filter);
  }
}
