import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from './language';
import { LanguagesResolver } from './languages.resolver';
import { BiblesService } from '../bibles/bibles.service';
import { BibleModelModule } from '../bibles/bibles.module';

export const LanguageModelModule = MongooseModule.forFeature([{
  name: Language.name,
  schema: LanguageSchema,
}]);

@Module({
  imports: [LanguageModelModule, BibleModelModule],
  providers: [LanguagesService, LanguagesResolver, BiblesService],
  exports: [LanguagesService],
})
export class LanguagesModule {
}
