import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book';
import { ChapterModelModule } from '../chapters/chapters.module';
import { VerseModelModule } from '../verses/verses.module';
import { ChaptersService } from '../chapters/chapters.service';
import { VersesService } from '../verses/verses.service';
import { BiblesService } from '../bibles/bibles.service';
import { BibleModelModule } from '../bibles/bibles.module';

export const BookModelModule = MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]);

@Module({
  imports: [BookModelModule, forwardRef(() => BibleModelModule), ChapterModelModule, VerseModelModule],
  providers: [BooksService, BooksResolver, BiblesService, ChaptersService, VersesService],
  exports: [BooksService],
})
export class BooksModule {
}
