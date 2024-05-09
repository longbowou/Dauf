import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Bible } from '../bibles/bible';

@ObjectType()
@Schema()
export class Language {
  @Field()
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  slug: string;

  @Field(type => [Bible])
  bibles: [Bible];

  @Field(type => Int)
  biblesCount: number;
}

export type LanguageDocument = Language & Document;

export const LanguageSchema = SchemaFactory.createForClass(Language);