import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Book} from '../books/book';
import {Bible} from '../bibles/bible';
import {Verse} from '../verses/verse';

@ObjectType()
@Schema()
export class Chapter {
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
    index: number;

    @Field(type => Bible)
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Bible'})
    bible: Bible | string;

    @Field(type => Book)
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Book'})
    book: Book | string;

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
    slug: string;

    @Field(type => [Verse])
    verses: [Verse];

    @Field(type => Int)
    versesCount: number;
}

export type ChapterDocument = Chapter & Document;

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
