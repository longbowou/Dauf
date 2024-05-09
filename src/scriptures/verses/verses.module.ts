import {forwardRef, Module} from '@nestjs/common';
import {VersesService} from './verses.service';
import {VersesResolver} from './verses.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {Verse, VerseSchema} from './verse';
import {BiblesService} from '../bibles/bibles.service';
import {BibleModelModule} from '../bibles/bibles.module';
import {ChaptersService} from "../chapters/chapters.service";
import {ChapterModelModule} from "../chapters/chapters.module";

export const VerseModelModule = MongooseModule.forFeature([{name: Verse.name, schema: VerseSchema}]);

@Module({
    imports: [VerseModelModule, forwardRef(() => BibleModelModule), forwardRef(() => ChapterModelModule)],
    providers: [VersesService, VersesResolver, BiblesService, ChaptersService],
    exports: [VersesService],
})
export class VersesModule {
}
