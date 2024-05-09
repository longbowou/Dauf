import { forwardRef, Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersResolver } from './chapters.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './chapter';
import { VersesService } from '../verses/verses.service';
import { VerseModelModule } from '../verses/verses.module';
import { BiblesService } from '../bibles/bibles.service';
import { BibleModelModule } from '../bibles/bibles.module';

export const ChapterModelModule = MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]);

@Module({
  imports: [ChapterModelModule, forwardRef(() => BibleModelModule), VerseModelModule],
  providers: [ChaptersService, ChaptersResolver, BiblesService, VersesService],
  exports: [ChaptersService],
})
export class ChaptersModule {
}
