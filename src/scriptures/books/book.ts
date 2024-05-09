import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Bible} from '../bibles/bible';
import {Chapter} from '../chapters/chapter';

export enum BookGroup {
    OLD = 'OLD',
    NEW = 'NEW',
}

@ObjectType()
@Schema()
export class Book {
    @Field()
    id: string;

    @Field()
    @Prop()
    name: String;

    @Field(type => Int)
    @Prop({index: true})
    index: number;

    @Field(type => Bible)
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Bible'})
    bible: Bible | string;

    @Field()
    @Prop({index: true})
    bibleSlug: string;

    @Field()
    @Prop({index: true})
    slug: string;

    @Field()
    @Prop({index: true})
    group: string;

    @Field(type => [Chapter])
    chapters: [Chapter];

    @Field(type => Int)
    chaptersCount: number;

    @Field(type => Int)
    versesCount: number;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
