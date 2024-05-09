import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Language, LanguageDocument} from './language';

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language.name) private model: Model<LanguageDocument>) {
  }

  async createOrUpdate(filter, model: Language) {
    return this.model.findOneAndUpdate(filter, model,
        {upsert: true, new: true, setDefaultsOnInsert: true});
  }

  async findAll() {
    return this.model.find().sort('slug');
  }

  async findOne(filter) {
    return this.model.findOne(filter);
  }

  async delete(filter = {}): Promise<any> {
    return this.model.deleteMany(filter);
  }
}
