import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BiblesService } from '../bibles/bibles.service';
import { LanguagesService } from './languages.service';
import { Language } from './language';

@Resolver(() => Language)
export class LanguagesResolver {
  constructor(private readonly service: LanguagesService,
              private readonly biblesService: BiblesService) {
  }

  @Query(returns => [Language])
  async languages() {
    return this.service.findAll();
  }

  @Query(returns => Language, { nullable: true })
  async language(@Args('id', { nullable: true }) id?: string,
                 @Args('slug', { nullable: true }) slug?: string) {
    if (id)
      return await this.service.findOne({ '_id': id });
    if (slug)
      return await this.service.findOne({ slug });
    return null;
  }

  @ResolveField()
  async bibles(@Parent() model: Language) {
    return this.biblesService.find({ language: model.id });
  }

  @ResolveField()
  async biblesCount(@Parent() model: Language) {
    return await this.biblesService.count({ language: model.id });
  }
}