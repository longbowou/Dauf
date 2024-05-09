import { Module } from '@nestjs/common';
import { BiblesService } from './bibles.service';
import { BiblesResolver } from './bibles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Bible, BibleSchema } from './bible';
import { ChaptersService } from '../chapters/chapters.service';
import { VersesService } from '../verses/verses.service';
import { BooksService } from '../books/books.service';
import { ChapterModelModule } from '../chapters/chapters.module';
import { VerseModelModule } from '../verses/verses.module';
import { BookModelModule } from '../books/books.module';

export const BibleModelModule = MongooseModule.forFeature([{
  name: Bible.name,
  schema: BibleSchema,
}]);

@Module({
  imports: [BibleModelModule, BookModelModule, ChapterModelModule, VerseModelModule],
  providers: [BiblesService, BiblesResolver, BooksService, ChaptersService, VersesService],
  exports: [BiblesService],
})
export class BiblesModule {
}
