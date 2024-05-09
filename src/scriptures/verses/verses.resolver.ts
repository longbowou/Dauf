import {Args, Query, Resolver} from '@nestjs/graphql';
import {VersesService} from './verses.service';
import {Verse} from './verse';
import {BiblesService} from '../bibles/bibles.service';
import {ChaptersService} from "../chapters/chapters.service";

@Resolver(() => Verse)
export class VersesResolver {
    constructor(private readonly service: VersesService,
                private readonly biblesService: BiblesService,
                private readonly chaptersService: ChaptersService) {
    }

    @Query(returns => [Verse])
    async verses(@Args('number', {nullable: true}) number?: number,
                 @Args('content', {nullable: true}) content?: string,
                 @Args('slug', {nullable: true}) slug?: string,
                 @Args('group', {nullable: true}) group?: string,
                 @Args('bibleId', {nullable: true}) bibleId?: string,
                 @Args('bibleSlug', {nullable: true}) bibleSlug?: string,
                 @Args('bookId', {nullable: true}) bookId?: string,
                 @Args('bookSlug', {nullable: true}) bookSlug?: string,
                 @Args('chapterId', {nullable: true}) chapterId?: string,
                 @Args('chapterSlug', {nullable: true}) chapterSlug?: string,
                 @Args('beforeChapterId', {nullable: true}) beforeChapterId?: string,
                 @Args('beforeChapterSlug', {nullable: true}) beforeChapterSlug?: string,
                 @Args('afterChapterId', {nullable: true}) afterChapterId?: string,
                 @Args('afterChapterSlug', {nullable: true}) afterChapterSlug?: string,
                 @Args('skip', {nullable: true,}) skip?: number,
                 @Args('limit', {nullable: true}) limit?: number) {

        let filter = {}
        if (number) {
            filter['number'] = {$gte: number}
        }

        if (slug) {
            filter['slug'] = slug
        }

        if (group) {
            filter['group'] = group
        }

        if (bibleId) {
            filter['bibleId'] = bibleId
        }

        if (bibleSlug) {
            filter['bibleSlug'] = bibleSlug
        }

        if (bookId) {
            filter['bookId'] = bookId
        }

        if (bookSlug) {
            filter['bookSlug'] = bookSlug
        }

        if (chapterId) {
            filter['chapterId'] = chapterId
        }

        if (chapterSlug) {
            filter['chapterSlug'] = chapterSlug
        }

        if (beforeChapterId || beforeChapterSlug) {
            const chapters = await this.chaptersService.find({bibleSlug: bibleSlug})
            for (let i = 0; i < chapters.length; i++) {
                if (chapters[i].id == beforeChapterId || chapters[i].slug == beforeChapterSlug) {
                    filter["chapterSlug"] = chapters[(i - 1)].slug
                    break;
                }
            }
        }

        if (afterChapterId || afterChapterSlug) {
            const chapters = await this.chaptersService.find({bibleSlug: bibleSlug})
            for (let i = 0; i < chapters.length; i++) {
                if (chapters[i].id == afterChapterId || chapters[i].slug == afterChapterSlug) {
                    filter["chapterSlug"] = chapters[(i + 1)].slug
                    break;
                }
            }
        }

        return this.service.find(filter, content, skip, limit);
    }

    @Query(returns => Verse, {nullable: true})
    async verse(@Args('id', {nullable: true}) id?: string,
                @Args('number', {nullable: true}) number?: number,
                @Args('content', {nullable: true}) content?: string,
                @Args('slug', {nullable: true}) slug?: string,
                @Args('group', {nullable: true}) group?: string,
                @Args('bibleId', {nullable: true}) bibleId?: string,
                @Args('bibleSlug', {nullable: true}) bibleSlug?: string,
                @Args('bookId', {nullable: true}) bookId?: string,
                @Args('bookSlug', {nullable: true}) bookSlug?: string) {
        if (id)
            return await this.service.findOne({'_id': id});

        let filter = {}
        if (number) {
            filter['number'] = {$gte: number}
        }

        if (slug) {
            filter['slug'] = slug
        }

        if (group) {
            filter['group'] = group
        }

        if (bibleId) {
            filter['bibleId'] = bibleId
        }

        if (bibleSlug) {
            filter['bibleSlug'] = bibleSlug
        }

        if (bookId) {
            filter['bookId'] = bookId
        }

        if (bookSlug) {
            filter['bookSlug'] = bookSlug
        }

        return this.service.findOne(filter, content);
    }
}
