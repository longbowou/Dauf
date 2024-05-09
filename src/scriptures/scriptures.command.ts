import {BiblesService} from './bibles/bibles.service';
import {BooksService} from './books/books.service';
import {ChaptersService} from './chapters/chapters.service';
import {VersesService} from './verses/verses.service';
import {ConsoleService} from 'nestjs-console';
import {ConsoleLogger, Injectable} from '@nestjs/common';
import {Bible} from './bibles/bible';
import {join} from 'path';
import {Book, BookGroup} from './books/book';
import slugify from 'slugify';
import {Chapter} from './chapters/chapter';
import {Verse} from './verses/verse';
import {LanguagesService} from './languages/languages.service';
import {Language} from './languages/language';

@Injectable()
export class ScriptureCommand {
    baseScrapBibleUrl = 'https://my.bible.com/bible';

    constructor(private readonly consoleService: ConsoleService,
                private readonly consoleLogger: ConsoleLogger,
                private readonly languagesService: LanguagesService,
                private readonly biblesService: BiblesService,
                private readonly booksService: BooksService,
                private readonly chaptersService: ChaptersService,
                private readonly versesService: VersesService) {
        const cli = this.consoleService.getCli();

        this.consoleService.createCommand(
            {
                command: 'scrape-kjv',
                description: 'Scrape The King James Version Apocrypha',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeKjv,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-niv',
                description: 'Scrape New International Version',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeNiv,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-amp',
                description: 'Scrape Amplified Version',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeAmp,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-lsg',
                description: 'Scrape Louis Segond',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeLsg,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-bds',
                description: 'Scrape Semeur',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeBds,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-s21',
                description: 'Scrape Second 21',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeS21,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-mar',
                description: 'Scrape Martin',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeMar,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-darby',
                description: 'Scrape Darby',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeDarby,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-ost',
                description: 'Scrape Bible Ostervald',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeOst,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-bfc',
                description: 'Scrape Français Courant',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeBfc,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-nsb',
                description: 'Scrape Nouvelle Bible Segond',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeNbs,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-pdv',
                description: 'Scrape Parole de Vie',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapePdv,
            cli,
        );

        this.consoleService.createCommand(
            {
                command: 'scrape-al',
                description: 'Scrape Agbenya La',
                options: [
                    {
                        flags: '-r, --reset',
                        required: false,
                    },
                    {
                        flags: '-rb, --resetBook',
                        required: false,
                    },
                    {
                        flags: '-b, --book <value>',
                        required: false,
                    },
                    {
                        flags: '-bo, --bookOnly',
                        required: false,
                    },
                    {
                        flags: '-c, --chapter <value>',
                        required: false,
                    },
                    {
                        flags: '-co, --chapterOnly',
                        required: false,
                    },
                ],
            },
            this.scrapeAl,
            cli,
        );
    }

    getEn() {
        let language = new Language();
        language.name = 'English';
        language.slug = 'en';
        return this.languagesService.createOrUpdate({slug: language.slug}, language);
    }

    getFr() {
        let language = new Language();
        language.name = 'French';
        language.slug = 'fr';
        return this.languagesService.createOrUpdate({slug: language.slug}, language);
    }

    getEwe() {
        let language = new Language();
        language.name = 'Ewé';
        language.slug = 'ewe';
        return this.languagesService.createOrUpdate({slug: language.slug}, language);
    }

    preProcess = async (options, bible, bookIndex) => {
        if (options.reset) {
            await this.versesService.delete({bibleSlug: bible.slug});
            await this.chaptersService.delete({bibleSlug: bible.slug});
            await this.booksService.delete({bibleSlug: bible.slug});
        }

        if (options.resetBook) {
            await this.versesService.delete({bibleSlug: bible.slug, bookIndex: bookIndex});
            await this.chaptersService.delete({bibleSlug: bible.slug, bookIndex: bookIndex});
        }
    }

    scrapeKjv = async (options) => {
        let bible = new Bible();
        bible.name = 'King James Version';
        bible.abbreviatedTitle = 'KJV';
        bible.publicationYear = 1995;
        bible.description = 'Includes the books of I & II Esdras, Tobit, Judith, Additions to Esther, Wisdom of Solomon, Sirach, Baruch, Letter of Jeremiah, Song of Three Youths, Susanna, Bel and the Dragon, Prayer of Manasseh, and I & II Maccabees.';
        bible.slug = 'kjv';
        bible.language = (await this.getEn()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/kjv.json'));
        await this.processBible(bible, books, {
            id: 1,
            slug: 'kjv'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('KJV Scrapped');
    };

    scrapeNiv = async (options) => {
        let bible = new Bible();
        bible.name = 'New International Version';
        bible.abbreviatedTitle = 'NIV';
        bible.publicationYear = 1978;
        bible.description = 'The New International Version (NIV) is an English translation of the Bible first published in 1978 by Biblica (formerly the International Bible Society). The NIV was published to meet the need for a modern translation done by Bible scholars using the earliest, highest quality manuscripts available.';
        bible.slug = 'niv';
        bible.language = (await this.getEn()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/niv.json'));
        await this.processBible(bible, books, {
            id: 111,
            slug: 'niv'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('NIV Scrapped');
    };

    scrapeAmp = async (options) => {
        let bible = new Bible();
        bible.name = 'Amplified Bible';
        bible.abbreviatedTitle = 'AMP';
        bible.publicationYear = 1978;
        bible.description = 'The Amplified Bible is a Literal Equivalent translation that, by using synonyms and definitions, both explains and expands the meaning of words in the text by placing amplification in parentheses, brackets, and after key words.';
        bible.slug = 'amp';
        bible.language = (await this.getEn()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/amp.json'));
        await this.processBible(bible, books, {
            id: 1588,
            slug: 'amp'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('AMP Scrapped');
    };

    scrapeDarby = async (options) => {
        let bible = new Bible();
        bible.name = 'Darby';
        bible.abbreviatedTitle = 'DARBY';
        bible.publicationYear = 1985;
        bible.description = 'Bible réalisée par John Nelson Darby un théologien polyglotte (hébreu, grec ancien, anglais, français, allemand et italien) à l’origine du mouvement des Assemblée des frères.';
        bible.slug = 'darby';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/darby.json'));
        await this.processBible(bible, books, {
            id: 64,
            slug: 'frdby'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('DARBY Scrapped');
    };

    scrapeS21 = async (options) => {
        let bible = new Bible();
        bible.name = 'Second 21';
        bible.abbreviatedTitle = 'S21';
        bible.publicationYear = 1996;
        bible.description = 'Bible réalisée par une équipe de traduction de la Société Biblique de Genève dont fait partie la bibliste Viviane André (FLTE).';
        bible.slug = 's21';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/s21.json'));
        await this.processBible(bible, books, {
            id: 152,
            slug: 's21'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('S21 Scrapped');
    };

    // scrapeBcc = async (options) => {
    //     let bible = new Bible();
    //     bible.name = "Bible catholique Crampon 1923 (BCC1923)";
    //     bible.abbreviatedTitle = "BCC";
    //     bible.publicationYear = 1923;
    //     bible.description = "Cette œuvre est mise à disposition selon les termes de la Licence Creative Commons Attribution - Pas d’Utilisation Commerciale - Pas de Modification 2.0 France.";
    //     bible.slug = "bcc";
    //     bible.language = (await this.getFr()).id;
    //     bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);
    //
    //     if (options.reset) {
    //         await this.versesService.delete({bibleSlug: bible.slug});
    //             await this.chaptersService.delete({bibleSlug: bible.slug});
    //             await this.booksService.delete({bibleSlug: bible.slug});
    //     }
    //
    //     let startAtBook = 0;
    //     if (parseInt(options.book)) {
    //         startAtBook = parseInt(options.book);
    //     }
    //
    //     let startAtChapter = 0;
    //     if (parseInt(options.chapter)) {
    //         startAtChapter = parseInt(options.chapter);
    //     }
    //
    //     const books = require(join(process.cwd(), "src/scrapping/bible/fr.json"));
    //     await this.processBible(bible, books, {id: 504, slug: "BBC1923"}, 3, startAtBook, startAtChapter);
    //
    //     this.consoleLogger.verbose("BCC Scrapped");
    // };

    scrapeBfc = async (options) => {
        let bible = new Bible();
        bible.name = 'Français Courant';
        bible.abbreviatedTitle = 'BFC';
        bible.publicationYear = 1997;
        bible.description = 'Bible élaborée par l’Alliance Biblique Universelle comprenant une équipe de collaborateurs protestants et catholiques.';
        bible.slug = 'bfc';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/bfc.json'));
        await this.processBible(bible, books, {
            id: 63,
            slug: 'bfc'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('BFC Scrapped');
    };

    scrapeBds = async (options) => {
        let bible = new Bible();
        bible.name = 'Semeur';
        bible.abbreviatedTitle = 'BDS';
        bible.publicationYear = 2015;
        bible.description = 'Bible réalisée par un collectif dont l’autodidacte Alfred Kuen (professeur à l’Institut biblique et missionnaire Emmaüs, actuellement HET), Jacques Buchhold (ancien doyen à la FLTE), André Loverini et Sylvain Romerowski (professeur à l’IBN).';
        bible.slug = 'bds';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/bds.json'));
        await this.processBible(bible, books, {
            id: 21,
            slug: 'bds'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('BDS Scrapped');
    };

    scrapeLsg = async (options) => {
        let bible = new Bible();
        bible.name = 'Louis Segond';
        bible.abbreviatedTitle = 'LSG';
        bible.publicationYear = 1910;
        bible.description = 'Bible réalisée par Louis Segond un docteur en théologie, protestant sortant de l’université de Strasbourg.';
        bible.slug = 'lsg';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/lsg.json'));
        await this.processBible(bible, books, {
            id: 93,
            slug: 'lsg'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('LSG Scrapped');
    };

    scrapeMar = async (options) => {
        let bible = new Bible();
        bible.name = 'Martin';
        bible.abbreviatedTitle = 'MAR';
        bible.publicationYear = 1707;
        bible.description = 'Bible réalisée par une équipe de traduction de la Société Biblique de Genève dont fait partie la bibliste Viviane André (FLTE).';
        bible.slug = 'mar';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/mar.json'));
        await this.processBible(bible, books, {
            id: 62,
            slug: 'fmar'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('MAR Scrapped');
    };

    // scrapeNbs = async (options) => {
    //     let bible = new Bible();
    //     bible.name = "Nouvelle Bible Segond";
    //     bible.abbreviatedTitle = "BCC";
    //     bible.publicationYear = 2002;
    //     bible.description = "Texte biblique de la Nouvelle Bible Segond (NBS) © 2002, Société biblique française.";
    //     bible.slug = "bcc";
    //     bible.language = (await this.getFr()).id;
    //     bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);
    //
    //     if (options.reset) {
    //         await this.versesService.delete({bibleSlug: bible.slug});
    //             await this.chaptersService.delete({bibleSlug: bible.slug});
    //             await this.booksService.delete({bibleSlug: bible.slug});
    //     }
    //
    //     let startAtBook = 0;
    //     if (parseInt(options.book)) {
    //         startAtBook = parseInt(options.book);
    //     }
    //
    //     let startAtChapter = 0;
    //     if (parseInt(options.chapter)) {
    //         startAtChapter = parseInt(options.chapter);
    //     }
    //
    //     const books = require(join(process.cwd(), "src/scrapping/bible/fr.json"));
    //     await this.processBible(bible, books, {id: 504, slug: "BBC1923"}, 3, startAtBook, startAtChapter);
    //
    //     this.consoleLogger.verbose("NBS Scrapped");
    // };

    // scrapeNeg = async (options) => {
    //     let bible = new Bible();
    //     bible.name = "Nouvelle Edition de Genève 1979 (NEG79)";
    //     bible.abbreviatedTitle = "NEG";
    //     bible.publicationYear = 1979;
    //     bible.description = "Texte biblique de la Nouvelle Edition de Genève. Copyright © 1979 Société Biblique de Genève.";
    //     bible.slug = "neg";
    //     bible.language = (await this.getFr()).id;
    //     bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);
    //
    //     if (options.reset) {
    //         await this.versesService.delete({bibleSlug: bible.slug});
    //             await this.chaptersService.delete({bibleSlug: bible.slug});
    //             await this.booksService.delete({bibleSlug: bible.slug});
    //     }
    //
    //     let startAtBook = 0;
    //     if (parseInt(options.book)) {
    //         startAtBook = parseInt(options.book);
    //     }
    //
    //     let startAtChapter = 0;
    //     if (parseInt(options.chapter)) {
    //         startAtChapter = parseInt(options.chapter);
    //     }
    //
    //     const books = require(join(process.cwd(), "src/scrapping/bible/fr.json"));
    //     await this.processBible(bible, books, {id: 106, slug: "NEG79"}, null, startAtBook, startAtChapter);
    //
    //     this.consoleLogger.verbose("NEG Scrapped");
    // };

    // scrapeNfc = async (options) => {
    //     let bible = new Bible();
    //     bible.name = "Nouvelle Français courant";
    //     bible.abbreviatedTitle = "NFC";
    //     bible.publicationYear = 2019;
    //     bible.description = "Société biblique française – Bibli'0, 2019";
    //     bible.slug = "nfc";
    //     bible.language = (await this.getFr()).id;
    //     bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);
    //
    //     if (options.reset) {
    //         await this.versesService.delete({bibleSlug: bible.slug});
    //             await this.chaptersService.delete({bibleSlug: bible.slug});
    //             await this.booksService.delete({bibleSlug: bible.slug});
    //     }
    //
    //     let startAtBook = 0;
    //     if (parseInt(options.book)) {
    //         startAtBook = parseInt(options.book);
    //     }
    //
    //     let startAtChapter = 0;
    //     if (parseInt(options.chapter)) {
    //         startAtChapter = parseInt(options.chapter);
    //     }
    //
    //     const books = require(join(process.cwd(), "src/scrapping/bible/fr.json"));
    //     await this.processBible(bible, books, {id: 2367, slug: "NEG79"}, 3, startAtBook, startAtChapter);
    //
    //     this.consoleLogger.verbose("NEG Scrapped");
    // };

    scrapeOst = async (options) => {
        let bible = new Bible();
        bible.name = 'Ostervald';
        bible.abbreviatedTitle = 'OST';
        bible.publicationYear = 1744;
        bible.description = 'Bible entreprise par Jean Frédéric Ostervald, un théologien pasteur protestant et plusieurs fois doyen de la Compagnie des pasteurs de Neuchâtel.';
        bible.slug = 'ost';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/ost.json'));
        await this.processBible(bible, books, {
            id: 131,
            slug: 'ost'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('OST Scrapped');
    };

    scrapePdv = async (options) => {
        let bible = new Bible();
        bible.name = 'Parole de Vie';
        bible.abbreviatedTitle = 'PDV';
        bible.publicationYear = 2000;
        bible.description = 'Bible avec un nombre de mots limité (3500 mots) et des phrases courtes. Cette Bible a été conçu pour l’œuvre missionnaire d’Afrique de l’Ouest et convient aux enfants ou aux jeunes.';
        bible.slug = 'pdv';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/pdv.json'));
        await this.processBible(bible, books, {
            id: 133,
            slug: 'pdv2017'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('PDV Scrapped');
    };

    scrapeNbs = async (options) => {
        let bible = new Bible();
        bible.name = 'Nouvelle Bible Segond';
        bible.abbreviatedTitle = 'NSB';
        bible.publicationYear = 2002;
        bible.description = 'Texte biblique de la Nouvelle Bible Segond (NBS) © 2002, Société biblique française.';
        bible.slug = 'nsb';
        bible.language = (await this.getFr()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/nsb.json'));
        await this.processBible(bible, books, {
            id: 104,
            slug: 'nsb'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('NSB Scrapped');
    };

    scrapeAl = async (options) => {
        let bible = new Bible();
        bible.name = 'Agbenya La';
        bible.abbreviatedTitle = 'AL';
        bible.publicationYear = 2000;
        bible.description = 'Biblica, The International Bible Society, nana be Mawu ƒe nya la ɖoa amewo gbɔ to Biblia la gɔmeɖeɖe, Bibliatata kple Bibliasɔsrɔ̃ wɔnawo me le Afrika, Asia, Pacific, Europe, Latin Amerika, Middle East, North Amerika kple South Asia. Ɖe woƒe dɔ siawo wɔwɔ le xexea me godoo ta la, Biblica hã xɔ amewo ɖe dɔ me be woakaka Mawu ƒe Nya la, be amewo ƒe agbenɔnɔ natrɔ to woƒe kadodo me nɔnɔ kple Yesu Kristo me.';
        bible.slug = 'al';
        bible.language = (await this.getEwe()).id;
        bible = await this.biblesService.createOrUpdate({slug: bible.slug}, bible);

        let startAtBook = 0;
        if (parseInt(options.book)) {
            startAtBook = parseInt(options.book);
        }

        let startAtChapter = 0;
        if (parseInt(options.chapter)) {
            startAtChapter = parseInt(options.chapter);
        }

        await this.preProcess(options, bible, startAtBook)

        const books = require(join(process.cwd(), 'src/scrapping/bible/al.json'));
        await this.processBible(bible, books, {
            id: '1613',
            slug: 'AL'
        }, startAtBook, startAtChapter, options.bookOnly, options.chapterOnly);

        this.consoleLogger.verbose('AL Scrapped');
    };

    async processBible(bible, books, urlParam, startAtBook = 0, startAtChapter = 0, bookOnly = false, chapterOnly = false) {
        const puppeteer = require('puppeteer-extra');
        const randomUseragent = require('random-useragent');

        const StealthPlugin = require('puppeteer-extra-plugin-stealth');
        puppeteer.use(StealthPlugin());

        for (let i = 0; i < books.old.length; i++) {
            await this.puppeteerFromBibleBook(puppeteer, randomUseragent, bible, books.old[i], BookGroup.OLD, (i + 1), urlParam, startAtBook, startAtChapter, bookOnly, chapterOnly);
        }

        for (let j = 0; j < books.new.length; j++) {
            await this.puppeteerFromBibleBook(puppeteer, randomUseragent, bible, books.new[j], BookGroup.NEW, (books.old.length + j + 1), urlParam, startAtBook, startAtChapter, bookOnly, chapterOnly);
        }
    }

    async puppeteerFromBibleBook(puppeteer, randomUseragent, bible, book, group, index, urlParam, startAtBook, startAtChapter, bookOnly = false, chapterOnly = false) {
        let bookModel = new Book();
        bookModel.name = book.name;
        bookModel.index = index;
        bookModel.bible = bible.id;
        bookModel.bibleSlug = bible.slug;
        bookModel.group = group;
        bookModel.slug = slugify(book.slug.toLowerCase());
        bookModel = await this.booksService.createOrUpdate({
            bibleSlug: bible.slug,
            slug: bookModel.slug,
        }, bookModel);

        for (let i = 1; i <= book.chapters; i++) {
            if (startAtBook) {
                if (index < startAtBook) {
                    continue;
                }
            }

            if (startAtChapter) {
                if (index == startAtBook && i < startAtChapter) {
                    continue;
                }
            }

            if (bookOnly && index != startAtBook) {
                if (index < startAtBook) {
                    continue;
                } else {
                    break;
                }
            }

            if (chapterOnly) {
                if (index != startAtBook) {
                    if (index < startAtBook) {
                        continue;
                    } else {
                        break;
                    }
                } else {
                    if (i != startAtChapter) {
                        if (i < startAtChapter) {
                            continue;
                        } else {
                            break;
                        }
                    }
                }
            }

            await this.puppeteerFromBibleChapter(puppeteer, randomUseragent, bible, book, bookModel, group, i, urlParam);
        }
    }

    async puppeteerFromBibleChapter(puppeteer, randomUseragent, bible, book, bookModel, group, index, urlParam) {
        let url = `${this.baseScrapBibleUrl}/${urlParam.id}/${book.path}.${index}.${urlParam.slug}`;
        this.consoleLogger.verbose(url);

        const puppeteerArgs = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ];

        const browser = await puppeteer.launch({
            headless: true,
            args: puppeteerArgs,
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.setUserAgent(randomUseragent.getRandom());

        // const consoleLogger = this.consoleLogger;
        try {
            await page.goto(url, {
                waitUntil: 'networkidle0',
            });

            const verses = await page.evaluate(() => {
                let data = {};
                let elements = document.querySelectorAll('span[data-usfm]');
                elements.forEach((element) => {
                    let contentElements = element.children;
                    if (contentElements.length > 0) {
                        const number = parseInt(contentElements[0].textContent);
                        if (!isNaN(number)) {
                            data[number] = [];
                            let content = ""
                            for (const contentEl of contentElements) {
                                if (contentEl.className.startsWith('ChapterContent_content')) {
                                    content += contentEl.textContent;
                                } else if (contentEl.className.startsWith('ChapterContent_it') ||
                                    contentEl.className.startsWith('ChapterContent_sc')) {
                                    content += contentEl.firstChild.textContent;
                                }
                            }
                            data[number].push(content);
                        }
                    }
                });
                return data;
            });

            this.consoleLogger.verbose(Object.keys(verses).length);
            this.consoleLogger.verbose(verses);

            if (Object.keys(verses).length) {
                let chapterModel = new Chapter();
                chapterModel.name = `${bookModel.name} ${index}`;
                chapterModel.number = index;
                chapterModel.bookIndex = bookModel.index;
                chapterModel.index = parseInt(`${bookModel.index}${chapterModel.number}`);
                chapterModel.group = group;
                chapterModel.bible = bible.id;
                chapterModel.bibleSlug = bible.slug;
                chapterModel.book = bookModel.id;
                chapterModel.bookSlug = bookModel.slug;
                chapterModel.slug = slugify(`${bookModel.slug} ${index}`);
                chapterModel = await this.chaptersService.createOrUpdate({
                    bibleSlug: bible.slug,
                    slug: chapterModel.slug,
                }, chapterModel);

                for (const [number, contents] of Object.entries(verses)) {
                    let verseModel = new Verse();
                    verseModel.name = `${chapterModel.name}:${number}`;
                    verseModel.number = parseInt(number);
                    verseModel.bookIndex = bookModel.index;
                    verseModel.chapterIndex = chapterModel.index;
                    verseModel.content = (contents as Array<string>).join(' ').replace(/\s+/g, ' ').trim();
                    verseModel.group = group;
                    verseModel.bible = bible.id;
                    verseModel.bibleSlug = bible.slug;
                    verseModel.book = bookModel.id;
                    verseModel.bookSlug = bookModel.slug;
                    verseModel.chapter = chapterModel.id;
                    verseModel.chapterSlug = chapterModel.slug;
                    verseModel.slug = slugify(`${chapterModel.slug} ${number}`);
                    await this.versesService.createOrUpdate({
                        bibleSlug: bible.slug,
                        slug: verseModel.slug,
                    }, verseModel);
                }
            } else {
                const body = await page.evaluate(() => document.body.innerText);
                this.consoleLogger.verbose(body);
                await this.puppeteerFromBibleChapter(puppeteer, randomUseragent, bible, book, bookModel, group, index, urlParam);
            }
        } catch (e) {
            this.consoleLogger.error(e);
            await this.puppeteerFromBibleChapter(puppeteer, randomUseragent, bible, book, bookModel, group, index, urlParam);
        }

        await page.close();
        await browser.close();
    }
}