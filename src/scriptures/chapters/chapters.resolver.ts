import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {ChaptersService} from './chapters.service';
import {Chapter} from './chapter';
import {VersesService} from '../verses/verses.service';
import {BiblesService} from '../bibles/bibles.service';

@Resolver(() => Chapter)
export class ChaptersResolver {
    constructor(private readonly service: ChaptersService,
                private readonly biblesService: BiblesService,
                private readonly versesService: VersesService) {
    }

    @Query(returns => [Chapter])
    async chapters(@Args('slug', {nullable: true}) slug?: string,
                   @Args('bibleId', {nullable: true}) bibleId?: string,
                   @Args('bibleSlug', {nullable: true}) bibleSlug?: string,
                   @Args('bookId', {nullable: true}) bookId?: string,
                   @Args('bookSlug', {nullable: true}) bookSlug?: string) {
        let filter = {}
        if (slug) {
            filter['slug'] = slug
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

        return this.service.find(filter);
    }

    @Query(returns => Chapter, {nullable: true})
    async chapter(@Args('id', {nullable: true}) id?: string,
                  @Args('slug', {nullable: true}) slug?: string,
                  @Args('bibleId', {nullable: true}) bibleId?: string,
                  @Args('bibleSlug', {nullable: true}) bibleSlug?: string,
                  @Args('bookId', {nullable: true}) bookId?: string,
                  @Args('bookSlug', {nullable: true}) bookSlug?: string) {
        if (id)
            return await this.service.findOne({'_id': id});

        let filter = {}
        if (slug) {
            filter['slug'] = slug
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

        return this.service.findOne(filter);
    }

    @ResolveField()
    async verses(@Parent() model: Chapter) {
        return this.versesService.find({chapter: model.id});
    }

    @ResolveField()
    async versesCount(@Parent() model: Chapter) {
        return await this.versesService.count({chapter: model.id});
    }
}
