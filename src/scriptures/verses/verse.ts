import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Chapter} from '../chapters/chapter';
import * as mongoose from 'mongoose';
import {Book} from '../books/book';
import {Bible} from '../bibles/bible';

@ObjectType()
@Schema()
export class Verse {
    @Field()
    id: string;

    @Field()
    @Prop({index: true})
    name: String;

    @Field(type => Int)
    @Prop({index: true})
    number: number;

    @Field(type => Int)
    @Prop({index: true})
    bookIndex: number;

    @Field(type => Int)
    @Prop({index: true})
    chapterIndex: number;

    @Field()
    @Prop({index: true})
    content: string;

    @Field(type => Bible)
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Bible'})
    bible?: Bible | string | null;

    @Field(type => Book)
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Book'})
    book: Book | string;

    @Field(type => Chapter)
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'})
    chapter: Chapter | string;

    @Field()
    @Prop({index: true})
    group: string;

    @Field()
    @Prop({index: true})
    bibleSlug: string;

    @Field()
    @Prop({index: true})
    bookSlug: string;

    @Field()
    @Prop({index: true})
    chapterSlug: string;

    @Field()
    @Prop({index: true})
    slug: string;
}

export type VerseDocument = Verse & Document;

export const VerseSchema = SchemaFactory.createForClass(Verse);
VerseSchema.index({content: 'text'})