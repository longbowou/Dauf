# Dauf App

Are you tired of struggling to find a reliable software solution to display Scripture effectively on the big screen at
your church? Look no further than Dauf - the innovative app designed to revolutionize your sermon engagement experience.

Developed out of the need for a comprehensive tool to seamlessly present Scripture in various versions, Dauf is the
brainchild of individuals just like you who sought a solution and couldn't find one. Say goodbye to the limitations of
existing software and embrace the power of Dauf.

## Online Demo

Feel free to try it out. Check the links below.

### Frontend

[https://dauf.danielblandes.com](https://dauf.danielblandes.com)

### App (Backend)

GraphQl - [https://app.dauf.danielblandes.com/graphiql](https://app.dauf.danielblandes.com/graphiql)

## Key Features

- **Versatile Scripture Display**: With Dauf, you can effortlessly display Scripture from different versions on the big
  screen, enhancing the impact of your sermons and engaging your congregation like never before. Switch between versions
  seamlessly with just a few clicks, ensuring your message resonates with every member of your audience.

- **Deep Search Functionality**: Searching for a specific Scripture has never been easier. Dauf's advanced search
  feature
  allows you to dive deep into the Bible, finding the passages you need in seconds. Whether you're preparing for a
  sermon
  or responding to a question from the congregation, Dauf puts the answers at your fingertips.

- **Online GraphQL API**: Dauf goes beyond just being an app – it's a comprehensive platform that offers an online
  GraphQL
  API. Access a wide range of Bible versions for your unique use cases, whether you're building your own app or
  integrating Scripture into your website. With Dauf's API, the possibilities are endless.

- **User-Friendly Interface**: We understand that simplicity is key when it comes to technology in a church setting.
  That's
  why Dauf features an intuitive interface designed to be user-friendly for pastors, worship leaders, and volunteers
  alike. Spend less time navigating complicated software and more time delivering powerful messages.

- **Scraping Capability**: Dauf leverages advanced scraping technology to extract entire Bible versions from
  authoritative
  source, ensuring comprehensive access to a wide range of translations and editions.

- **GraphQl API Integration**: Access Dauf's online GraphQL API to fetch various Bible versions programmatically,
  empowering
  developers and creators to integrate Scripture seamlessly into their own applications, websites, or projects.

- **Development & Deployment**: Dauf adopts Docker containers to streamline development and deployment processes,
  enhancing the efficiency and consistency of its backend and frontend applications.

## Architecture

The application architecture is split in two different parts: app(backend) for API and frontend for scripture
presentation.

### App (Backend With Nest Framework)

The backend of the application serves as the central component responsible for managing data, handling business logic,
and facilitating communication between the frontend interfaces and the database. Here's a breakdown of its key
components

- **Server**: Dauf utilizes the [Nest](https://docs.nestjs.com) framework for building scalable and maintainable
  server-side applications.
  Nest.js leverages TypeScript for strong typing and enhanced developer productivity, making it an ideal choice for
  complex applications like Dauf.

- **Scraping Functionality**: Nest facilitates the implementation of scraping functionality by providing a robust
  ecosystem
  of libraries and tools. The app leverages these capabilities to scrape entire Bible versions from websites such as
  bible.com, ensuring comprehensive access to Scripture for users.

- **GraphQL API**: Nest seamlessly integrates GraphQL into the backend, allowing developers to define schema structures
  and
  resolvers for accessing and manipulating data. Dauf's GraphQL API provides endpoints for fetching various Bible
  versions, enabling flexible and efficient data retrieval for frontend consumption.

- **Modular Architecture**: Nest promotes a modular architecture, organizing code into reusable and maintainable
  modules.
  This approach enables developers to efficiently manage the complexities of the scraping process and GraphQL API
  implementation, ensuring scalability and extensibility as the app grows.

- **Data Management**: Dauf's backend manages the scraped Bible data efficiently, storing it in
  a [MongoDB](https://www.mongodb.com/docs/drivers/node/current) database. This
  ensures fast and reliable access to Bible versions for sermon display and retrieval.

### Frontend (Vue Framework)

The frontend interfaces for scripture presentation, controls and deep search. Here are the technical details

- **Framework**: Dauf's frontend is built using the [Vue](https://v2.vuejs.org/) framework, a progressive JavaScript
  framework known for its
  simplicity and versatility. Vue's component-based architecture facilitates the development of interactive and
  responsive
  user interfaces, crucial for Scripture presentation and user interaction.

- **API**: Dauf integrates the [Apollo](https://apollo.vuejs.org) library for GraphQL API integration on the frontend.
  Apollo simplifies the process
  of fetching and managing data from a GraphQL API, providing efficient caching mechanisms and powerful query
  capabilities. This integration enables seamless communication between the frontend and backend, ensuring real-time
  updates and smooth user experiences.

- **Scripture Presentation**: Vue components are utilized to create a dynamic and visually appealing interface for
  presenting Scripture on the big screen. Components such as slideshows, text displays, and navigation controls enable
  pastors and worship leaders to deliver impactful sermons and engage the congregation effectively.

- **State Management**: Utilize state management [Pinia](https://pinia.vuejs.org) to manage application state, including
  saved scriptures details.

- **Responsive Design**: Dauf's frontend is designed with responsiveness in mind, ensuring a consistent and optimized
  experience across devices of various screen sizes. Vue's flexible layout components and CSS
  frameworks [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction)
  enable the creation of fluid and adaptive user interfaces, enhancing accessibility and usability for all users.

## Requirement

- [Docker](https://docs.docker.com/install)

## Setup

- Clone the repository with submodules (you can use the https link of the repository if needed)

```bash
git clone git@gitlab.com:dauf-l/dauf-platform.git --recurse-submodules
```

- Build the application

```bash
docker compose build
```

- Update environments variable

```bash
cp app/.env.example app/.env && cp frontend/.env.example frontend/.env
```

### App (Backend)

- Install dependencies

```bash
docker compose run --rm app pnpm install
```

- Compiles and minifies for production

```bash
docker compose run --rm app pnpm build
```

### Run

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d app
```

## Where is the application running?

- App - [http://localhost:8000](http://localhost:8000)

## Scrapping

Scrapping services are available in the **docker-compose.yml** file.

- Starting a kjv service for scrapping King Jame Bible Version

```bash
docker compose up kjv
```

Here is available options

- -r => reset and scrap from zero
- -b => book index to start with
- -bo => scrap this book only require book index parameter
- -rb => reset book only require book index parameter
- -c => chapter number to start with
- -co => scrap this chapter only require chapter number parameter

### What's next ?

Check the backend part on [Dauf Platform](https://gitlab.com/dauf-l/dauf-platform) repository

## License

This project is licensed under the [MIT License](LICENSE).