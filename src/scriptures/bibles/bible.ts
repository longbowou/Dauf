import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Book} from '../books/book';
import * as mongoose from 'mongoose';
import {Language} from '../languages/language';

@ObjectType()
@Schema()
export class Bible {
    @Field()
    id: string;

    @Field()
    @Prop({index: true})
    name: string;

    @Field(type => Int)
    @Prop({index: true})
    index: number = 0;

    @Field()
    @Prop({index: true})
    abbreviatedTitle: string;

    @Field(type => Int)
    @Prop({index: true})
    publicationYear: number;

    @Field()
    @Prop({index: true})
    description: string;

    @Field(type => Language)
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Language'})
    language: Language | string;

    @Field()
    @Prop({index: true})
    slug: string;

    @Field(type => [Book])
    books: [Book];

    @Field(type => [Book])
    old: [Book];

    @Field(type => [Book])
    new: [Book];

    @Field(type => Int)
    booksCount: number;

    @Field(type => Int)
    chaptersCount: number;

    @Field(type => Int)
    versesCount: number;
}

export type BibleDocument = Bible & Document;

export const BibleSchema = SchemaFactory.createForClass(Bible);