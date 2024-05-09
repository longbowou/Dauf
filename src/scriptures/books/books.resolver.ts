import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Book} from './book';
import {BooksService} from './books.service';
import {ChaptersService} from '../chapters/chapters.service';
import {VersesService} from '../verses/verses.service';
import {BiblesService} from '../bibles/bibles.service';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly service: BooksService,
                private readonly biblesService: BiblesService,
                private readonly chaptersService: ChaptersService,
                private readonly versesService: VersesService) {
    }

    @Query(returns => [Book])
    async books(@Args('bibleId', {nullable: true}) bibleId?: string,
                @Args('bibleSlug', {nullable: true}) bibleSlug?: string) {
        let filter = {}
        if (bibleId) {
            filter['bibleId'] = bibleId
        }

        if (bibleSlug) {
            filter['bibleSlug'] = bibleSlug
        }

        return this.service.find(filter)
    }

    @Query(returns => Book, {nullable: true})
    async book(@Args('id', {nullable: true}) id?: string,
               @Args('slug', {nullable: true}) slug?: string,
               @Args('bibleId', {nullable: true}) bibleId?: string,
               @Args('bibleSlug', {nullable: true}) bibleSlug?: string) {
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

        return this.service.findOne(filter);
    }

    @ResolveField()
    async chapters(@Parent() model: Book) {
        return this.chaptersService.find({book: model.id});
    }

    @ResolveField()
    async chaptersCount(@Parent() model: Book) {
        return this.chaptersService.count({book: model.id});
    }

    @ResolveField()
    async versesCount(@Parent() model: Book) {
        return this.versesService.count({book: model.id});
    }
}
