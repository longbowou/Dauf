import {ConsoleLogger, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {GraphQLModule} from '@nestjs/graphql';
import {MercuriusDriver, MercuriusDriverConfig} from '@nestjs/mercurius';
import {ConsoleModule} from 'nestjs-console';
import {LanguagesModule} from './scriptures/languages/languages.module';
import {BiblesModule} from './scriptures/bibles/bibles.module';
import {BooksModule} from './scriptures/books/books.module';
import {ChaptersModule} from './scriptures/chapters/chapters.module';
import {VersesModule} from './scriptures/verses/verses.module';
import {ScriptureCommand} from './scriptures/scriptures.command';
import {join} from 'path';

@Module({
    imports: [
        LanguagesModule,
        BiblesModule,
        BooksModule,
        ChaptersModule,
        VersesModule,

        ConsoleModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        GraphQLModule.forRoot<MercuriusDriverConfig>({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            driver: MercuriusDriver,
            graphiql: true,
        })],
    controllers: [AppController],
    providers: [AppService, ConsoleLogger, ScriptureCommand],
    exports: [ScriptureCommand],
})
export class AppModule {
}
