import { Args, Field, Int, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BiblesService } from './bibles.service';
import { Bible } from './bible';
import { ChaptersService } from '../chapters/chapters.service';
import { VersesService } from '../verses/verses.service';
import { BooksService } from '../books/books.service';
import { BookGroup } from '../books/book';

@Resolver(() => Bible)
export class BiblesResolver {
  constructor(private readonly service: BiblesService,
              private readonly biblesService: BiblesService,
              private readonly booksService: BooksService,
              private readonly chaptersService: ChaptersService,
              private readonly versesService: VersesService) {
  }

  @Query(returns => [Bible])
  async bibles() {
    return this.service.find();
  }

  @Query(returns => Bible, { nullable: true })
  async bible(@Args('id', { nullable: true }) id?: string,
              @Args('slug', { nullable: true }) slug?: string) {
    if (id)
      return await this.service.findOne({ '_id': id });
    if (slug)
      return await this.service.findOne({ slug });
    return null;
  }

  @Query(returns => BibleStats)
  async bibleStats(@Args('id', { nullable: true }) id?: string,
                   @Args('slug', { nullable: true }) slug?: string) {
    if (slug) {
      const bible = await this.biblesService.findOne({ slug: slug });
      if (bible) {
        id = bible.id;
      }
    }

    let filter = {};
    if (id)
      filter = { 'bible': id };

    const stats = new BibleStats();
    stats.booksCount = await this.booksService.count(filter);
    stats.chaptersCount = await this.chaptersService.count(filter);
    stats.versesCount = await this.versesService.count(filter);

    stats.oldBooksCount = await this.booksService.count({ group: BookGroup.OLD, ...filter });
    stats.oldChaptersCount = await this.chaptersService.count({ group: BookGroup.OLD, ...filter });
    stats.oldVersesCount = await this.versesService.count({ group: BookGroup.OLD, ...filter });

    stats.newBooksCount = await this.booksService.count({ group: BookGroup.NEW, ...filter });
    stats.newChaptersCount = await this.chaptersService.count({ group: BookGroup.NEW, ...filter });
    stats.newVersesCount = await this.versesService.count({ group: BookGroup.NEW, ...filter });
    return stats;
  }

  @ResolveField()
  async books(@Parent() model: Bible) {
    return this.booksService.find({ bible: model.id });
  }

  @ResolveField()
  async old(@Parent() model: Bible) {
    return this.booksService.find({ bible: model.id, group: BookGroup.OLD });
  }

  @ResolveField()
  async new(@Parent() model: Bible) {
    return this.booksService.find({ bible: model.id, group: BookGroup.NEW });
  }

  @ResolveField()
  async booksCount(@Parent() model: Bible) {
    return await this.booksService.count({ bible: model.id });
  }

  @ResolveField()
  async chaptersCount(@Parent() model: Bible) {
    return await this.chaptersService.count({ bible: model.id });
  }

  @ResolveField()
  async versesCount(@Parent() model: Bible) {
    return await this.versesService.count({ bible: model.id });
  }
}

@ObjectType()
class BibleStats {
  @Field(type => Int)
  booksCount: number;

  @Field(type => Int)
  chaptersCount: number;

  @Field(type => Int)
  versesCount: number;

  @Field(type => Int)
  oldBooksCount: number;

  @Field(type => Int)
  oldChaptersCount: number;

  @Field(type => Int)
  oldVersesCount: number;

  @Field(type => Int)
  newBooksCount: number;

  @Field(type => Int)
  newChaptersCount: number;

  @Field(type => Int)
  newVersesCount: number;
}