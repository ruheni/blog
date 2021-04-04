---
title: Adding an API and database to your Nuxt App with Prisma
published: true
description: This tutorial explores how to build a fullstack application using Nuxt and Prisma for database access.
tags: javascript, nuxt, vue, express
date: '2021-02-18'
cover_image: https://paper-attachments.dropbox.com/s_00AF37BD6AC8393E927CA91EEFB0A63999A7CA54EDBC5EFA45354BC6B94E1BB9_1613649658449_Prisma_x_Nuxt.png
cannonical_url: https://dev.to/prisma/adding-an-api-and-database-to-your-nuxt-app-with-prisma-2nlp
---

Building fullstack applications has never been easier using [Nuxt](https://nuxtjs.org). It provides a [Vue](https://vuejs.org) framework for building blazing fast server-side rendered and static applications. [Prisma](https://prisma.io) is an ORM that offers developers a type-safe database client (currently supports  PostgreSQL, MySQL, SQLite, and SQL Server _preview_). This is useful when building APIs and is intuitive for both beginners and experienced developers.

Nuxt presents two options for building fullstack applications:
- Using Nuxt programmatically - setting up your own server with your [middleware](https://nuxtjs.org/docs/2.x/directory-structure/middleware) and API.
- [`serverMiddleware`](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware) - this is an extension of your Nuxt app that allows you to create additional routes without setting up an external server. The middleware is registered on application start.

In this article, you’ll learn how to add an API in your Nuxt application using Prisma for your database access and Nuxt’s `serverMiddleware` property.

## Prerequisites

Before you start, ensure you have Node.js installed. If you are using Visual Studio Code, you can supercharge your development experience by installing the [Prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) for auto-completion, formatting, and syntax highlighting. 

![](https://paper-attachments.dropbox.com/s_6AF9ABEB955DB3AAD3B965E721CBE5603955F2FD47440251DB514D08F2D85D33_1609335122080_image.png)


The completed project is available on [GitHub](https://github.com/ruheni/prisma-nuxt).


## Step 0: Initialize your Nuxt application

The first step is initializing your Nuxt application. 

```bash
npx create-nuxt-app awesome-nuxt-app
```

You’ll be asked a couple of questions such as the name of the projects, linter, testing framework, etc. Keep the app simple and go with the default options provided. To learn more about the options, head over to [Create Nuxt App](https://github.com/nuxt/create-nuxt-app/blob/master/README.md).

```bash
cd awesome-nuxt-app
npm run dev
```

Congratulations! Your application is now running on [http://localhost:3000](http://localhost:3000) 🥳.

![](https://paper-attachments.dropbox.com/s_73BF466ED2B54D3E86B7180578C8C4A2F8A05295E5EBFE61FC0C76AB74FCDA16_1612939180344_image.png)


## Step 1: Add Prisma to your app

Now that your Nuxt application is running, the next step is to set up Prisma. You’ll first install the Prisma CLI as a dev dependency by running the following command: 

```bash
npm install --save-dev prisma
```

### Initialize Prisma

Once the installation is complete, run the following command:

```bash
npx prisma init
```

The command above creates a folder called `prisma` at the root of your project which contains a file called `schema.prisma` and a `.env` file at the root of the project. The `schema.prisma` defines your database connection and Prisma Client generator. For this example, you’ll use SQLite for ease of setting up. If you’d like to use another database provider, switching is as simple as renaming the provider from `sqlite` to your provider of choice without any additional setup and updating the [connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls).

For our example, you’ll define two tables: `Post`  and `User` with a one-to-many relationship between `User` and `Post`. Update your `schema.prisma`  file to resemble this one:

```groovy
// schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

### Create your first database migration

To sync your data model to your database schema, you’ll need to use [`prisma migrate`](https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-dev) CLI.

```bash
npx prisma migrate dev --name init
```

The above command will create a migration called `init` located in the `/prisma/migrations` directory. The migrations folder is used to keep track of schema changes for our database. Think of it as _version control_, but for your database schema. The Prisma CLI also creates your `dev.db` database. 

After `prisma migrate` is done creating a migration, the Prisma CLI installs [`@prisma/client`](https://www.npmjs.com/package/@prisma/client) package and [generates Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/generating-prisma-client).

[Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) is an auto-generated and type-safe query builder _tailored_ to your database schema. `prisma migrate` will update your Prisma Client every time you run a migration.

> **Note**: The above features are now in [General Availability](https://www.prisma.io/docs/about/releases#generally-available-ga) and your feedback will be highly appreciated and will help us keep improving them. 🙂

## Step 2: Add your `serverMiddleware` endpoints

For your API, you will use [Express](https://expressjs.com) inside Nuxt to create our API. Sounds crazy, right?

Well, Express is used to allow your API endpoints to access the request and response objects.

Go ahead and install Express:

```bash
npm install express
```

Create an `api` folder and an `index.js` file that will contain your API handlers:

```bash
mkdir api
touch api/index.js
```

After creating your `/api/index.js` file, paste in the following code in  `index.js`:

```js
// index.js
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

/** 
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}
```

The above code initializes Express and Prisma and exports two properties, `path` and `handler`, which will be registered in `nuxt.config.js` in __Step 3__. The `path` property specifies the route the middleware will be accessible, and `handler` specifies the function executed when invoked. For the rest of this step, you’ll be working in `index.js` setting up the endpoints and their respective handlers.

### Create a `User`

The first feature you’ll be implementing is creating a user/ author. The database will be expecting an `email` and an optional `name`. It’s implementation is as follows:

```js
// index.js
app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  })
  res.json(result)
})
```

### Creating a `Post`

Next, you’ll add the create post endpoint. The request body will expect a `title`, `content` and `authorEmail`. If an author doesn’t exist in the database, their user record will be created.

```js
// index.js
app.post('/post', async (req, res) => {
  const { title, content, authorEmail } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connectOrCreate: {
          email: authorEmail
        }
      }
    }
  })
  res.status(200).json(post)
})
```

### Get drafts

Once that is done, you’ll need to be able to view all unpublished posts. Prisma lets you specify all relations you’d like to be returned in the response with the [`include`](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#include) property. This is where you’ll add the `author` [relation query](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries) to view the respective posts as well as their authors.

```js
// index.js
app.get('/drafts', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true }
  })
  res.json(posts)
})
```

### Get `Post` by `Id`

You can get a post by it’s id using [`findUnique`](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique) as follows:

```js
// index.js
app.get('/post/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: { author: true }
  })
  res.json(post)
})
```

### Publish a `Post`

When a `Post` is ready to go live update the published field:

```js
// index.js
app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: { published: true },
  })
  res.json(post)
})
```

### Get Feed
All your published posts can be made available on the `/feed` endpoint, filtering them by checking that the `published` property is set to `true`.

```js
// index.js
app.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  res.json(posts)
})
```

### Deleting a `Post`

The last CRUD feature is deleting a `Post` record in your database:

```js
// index.js
app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(post)
})
```

The final feature in your application is filtering posts, checking if the `searchString` is found in either the `title` or `content` of your Posts.

### Search for a `Post`
```js
// index.js
app.get('/filterPosts', async (req, res) => {
  const { searchString } = req.query
  const draftPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  })
  res.send(draftPosts)
})
```

## Step 3: Modify `nuxt.config.js`

The last step is registering your `serverMiddleware` in `nuxt.config.js` which is as simple as this.

```js
// nuxt.config.js
  serverMiddleware: [
    '~/api/index.js'
  ]
```

## Step 4: Take your API for a spin 

Once you’ve modified `nuxt.config.js`, make sure to restart your Nuxt app. You can use [Prisma Studio](https://www.prisma.io/studio) to create your database records. Alternatively, you can use your favorite API testing tool - for example [Postman](https://www.postman.com/),[Insomnia](https://www.insomnia.rest/) or [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - to test your API by making [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) requests against your API.

In a new terminal window, use the Prisma CLI to startup Prisma Studio.

```bash
npx prisma studio
```

The command opens Prisma studio on [`localhost:5555`](https://localhost:5555).

![Prisma Studio](https://paper-attachments.dropbox.com/s_73BF466ED2B54D3E86B7180578C8C4A2F8A05295E5EBFE61FC0C76AB74FCDA16_1612939344654_image.png)

Create a couple of `User` and `Post` records on Prisma Studio and save your changes.
 
![Prisma studio - creating users](https://paper-attachments.dropbox.com/s_73BF466ED2B54D3E86B7180578C8C4A2F8A05295E5EBFE61FC0C76AB74FCDA16_1612939474651_image.png)

![Prisma Studio- creating posts](https://paper-attachments.dropbox.com/s_73BF466ED2B54D3E86B7180578C8C4A2F8A05295E5EBFE61FC0C76AB74FCDA16_1612971944780_image.png)

Since the post isn’t published yet, fetch a list of the drafted posts using the GET `api/drafts` endpoint.

![Nuxt app - draft posts](https://paper-attachments.dropbox.com/s_73BF466ED2B54D3E86B7180578C8C4A2F8A05295E5EBFE61FC0C76AB74FCDA16_1612939657477_image.png)

Congratulations!  Your app is up and running! 🎉

# Conclusion

Nuxt is a great tool for building fullstack applications using Vue. Pair it up with Prisma and working with databases while building a fullstack app becomes less of a hassle. This enables a developer to focus on what matters, shipping features!

Using Nuxt to build fullstack applications is great for prototyping. However, if you’d like to build bigger applications, it’s recommended to separate your frontend from the backend.

I hope you liked this tutorial and learned something useful. The completed project is available on [GitHub](https://github.com/ruheni/prisma-nuxt).

Do you have any suggestions of any libraries/frameworks you’d like to see paired with Prisma? Feel free to let us know in the discussion or create an [issue on GitHub](https://github.com/prisma/prisma-examples/issues).

Happy hacking!
![Prototyping_CRUDE_API](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nrpbanmr1eyevabynuv1.png)
 