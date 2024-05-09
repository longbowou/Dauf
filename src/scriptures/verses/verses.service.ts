import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Verse, VerseDocument} from './verse';

@Injectable()
export class VersesService {
    constructor(@InjectModel(Verse.name) private model: Model<VerseDocument>) {
    }

    async createOrUpdate(filter, model: Verse) {
        return this.model.findOneAndUpdate(filter, model, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
    }

    async find(filter = {}, content = null, skip = null, limit = null) {
        if (content) {
            filter = {$text: {$search: content}, ...filter}
        }
        const filterQuery = this.model.find(filter)
            .populate('bible')
            .populate('book')
            .populate('chapter');

        if (skip) {
            filterQuery.skip(skip)
        }

        if (limit) {
            filterQuery.limit(limit)
        }

        if (content) {
            return filterQuery;
        }

        filterQuery
            .sort("chapterIndex index")
            .allowDiskUse(true)

        return filterQuery
    }

    async findOne(filter = {}, content = null) {
        if (content) {
            filter = {$text: {$search: content}, ...filter}
        }
        return this.model.findOne(filter)
            .populate('bible')
            .populate('book')
            .populate('chapter');
    }

    async count(filter = {}) {
        return this.model.count(filter);
    }

    async delete(filter = {}): Promise<any> {
        return this.model.deleteMany(filter);
    }
}
