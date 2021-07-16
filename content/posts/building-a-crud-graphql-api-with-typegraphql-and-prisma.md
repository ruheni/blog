---
title: Building a GraphQL CRUD API for your Database with TypeGraphQL & Prisma
published: true
description: Learn how to quickly prototype a GraphQL API with Apollo-Server, Nexus, Prisma and TypeGraphQL
date: '2021-02-18'
# cover: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r99tjly26f4id0w82mau.png
cannonical_url: https://dev.to/prisma/prototyping-a-crud-api-with-typegraphql-and-prisma-for-your-database-424c
---

Building CRUD APIs can be a tedious chore. The time spent writing glue code, plumbing layers together and doing repetitive work is often better invested into tasks that actually add value and solve interesting problems.

In this article, you'll explore how you can prototype an e-commerce GraphQL CRUD API using [TypeGraphQL](https://typegraphql.com/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/) and [Prisma](https://prisma.io) for database access. [SQLite](https://sqlite.org/index.html) will be the database of choice in this tutorial because of its ease of setup. Feel free to use your choice database - Prisma currently supports PostgreSQL, MySQL and SQL Server _preview_.

The complete example used in this tutorial is available on [GitHub](https://github.com/ruheni/typegraphql-crud-api).

## What is TypeGraphQL?

TypeGraphQL is a framework that follows a [code-first](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3) and object-oriented approach towards building GraphQL APIs. It leverages [TypeScript](https://www.typescriptlang.org/) by using classes and decorators.

> **Note**: If you're not familiar with TypeScript yet, check out [Learn TypeScript: A Pocketguide Tutorial](https://www.prisma.io/blog/learn-typescript-a-pocketguide-tutorial-q329XmXQHUjz).

## What is Prisma?

Prisma is an ORM - Object-relational mapper. It provides a declarative way to define your database models that are easy to read and understand. It also offers a type-safe database client from your database schema that is intuitive and fun. 🙂

## Prerequisites

Before getting started, ensure you have the following:
- Installed [Node.js](https://nodejs.org/en/).
- Basic understanding of JavaScript/TypeScript.
- Familiarity with GraphQL APIs.

> **Note**: To get started on learning the basics of GraphQL, [How To GraphQL](https://howtographql.com) will give you a great foundation.


## Step 1: Initialize Your Project

The first step will be creating your working directory on your computer and initialize it by running `npm init -y`. This command will generate a `package.json` file with prepopulated values.

```bash
mkdir crud-api
cd crud-api
npm init -y
```

### Set Up Dependencies

Install the following dependencies in your project:

```bash
npm install apollo-server type-graphql reflect-metadata class-validator
```

Your project will be dependent on the following development dependencies:

```bash
npm install --save-dev typescript ts-node-dev ts-node @types/node @types/ws
```

The `typescript` and `ts-node-dev` dependencies are required to transpile your TypeScript files and restart the app server when a change is made to a file.

### A Little More 🔧

Create a `tsconfig.json` file in your project: 

```bash
touch tsconfig.json
```

`tsconfig.json` allows you to define options that will let the TypeScript compiler take advantage of when transpiling your code to JavaScript.

Paste in the following code to your `tsconfig.json` file:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "lib": [
      "es2018",
      "esnext.asynciterable"
    ],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```


To take advantage of `ts-node-dev`'s live reloading, modify `scripts` in your `package.json` to this script: 

```json
// package.json
"scripts": {
  "dev": "ts-node-dev --no-notify --respawn --transpile-only src/index.ts"
},
```

Next, create your `src` directory - this will house the bulk of your application - and create an `index.ts` file as well:

```bash
mkdir src
touch src/index.ts
```

The following code will be your initial setup of your GraphQL server:

```js
// index.ts
import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'

const app = async () => {
  const schema = await tq.buildSchema({})


  new ApolloServer({ schema }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: http://localhost:4000')
  )
}

app()
```

> VS Code's TypeScript compiler will throw an error about the buildSchema missing the `resolver` argument. Not to worry, this will be covered in **Step 3: Set up `typegraphql-prisma`**. 🙂


## Step 2: Set Up Prisma

Now that that's out of the way let's get to the fun part, data modeling.

### Initialize Prisma 

You'll need to setup Prisma in your project by running the following command:

```bash
npx prisma init
```

The Prisma CLI creates a `.env` file in your project's root and a new `prisma` directory. The folder created will contain a `schema.prisma` file that defines your database connection, the [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) generator and this is where you will define your database models.

The default [database source](https://www.prisma.io/docs/concepts/components/prisma-schema/data-sources/) is PostgreSQL. However, you can switch this to your preferred provider - SQLite, MySQL or SQL Server - and modify the `url` pointing to your database. For ease of setup, this example will use SQLite.

### Database Models

For the e-commerce API, you will define 4 models: `Product`, `Category`, `Order` and `User`. The relationships between these entities will be as follows:

- one-to-many relationship between `User` and `Order`.
- many-to-many relationship between `Product` and `Category`.
- many-to-many relationship between `Order` and `Product`.

Here is a visual diagram representing the relationships between the different database models:

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gtv3my83usnfcjz0t0zv.png)


### Your Prisma Schema

With the relationships defined, your final database models should be similar to the one below:

```groovy
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Product {
  id          String     @id @default(uuid())
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  name        String
  sku         String     @unique
  description String?
  quantity    Int
  categories  Category[]
  orders      Order[]
}

model Category {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  name      String
  products  Product[]
}

model Order {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  userId    Int?
  customer  User?     @relation(fields: [userId], references: [id])
  products  Product[]
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  email     String   @unique
  firstName String?
  lastName  String?
  address   String?
  orders    Order[]
}

```

Feel free to modify the fields provided to your preference.

### Your First Migration

Next, you'll sync your schema with your database with the following command:

```bash
npx prisma migrate dev --name init
```

The above command creates a database migration and executes it against your database. A database migration refers to incremental, reversible changes that are made to a database schema over time. In that sense, you can think of migrations as a tool enabling "version control" for your database.

The command creates a migration called `init`. Once the migration is complete, a new `/prisma/migrations` directory is created. Since you're working with SQLite, Prisma CLI will create your database and apply the changes against your database. 

After the first migration is created, the Prisma CLI installs the [`@prisma/client`](https://www.npmjs.com/package/@prisma/client) package. In subsequent database migrations, the Prisma CLI will generate your Prisma Client. [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) is an auto-generated database client that allows you to interact with your database in a type-safe way.

Pretty neat, right? 😜

## Step 3: Modify Your GraphQL Server

Create an instance of `PrismaClient` and add it to the context of your GraphQL Server as follows:

```ts
//index.ts
import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const app = async () => {
  const schema = await tq.buildSchema({})

  const context = {
    prisma
  }

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: http://localhost:4000')
  )
}

app()
```

Adding `prisma` to your context makes sure that `PrismaClient` is made available to your GraphQL operations.

## Step 4: Set Up `typegraphql-prisma`

TypeGraphQL provides an integration with Prisma using the [`typegraphql-prisma`](https://www.npmjs.com/package/typegraphql-prisma) package. This package will auto-generate type classes CRUD resolver and enums based on your Prisma schema, which you otherwise would need to write manually.

Install `typegraphql-prisma` as a dev dependency with the following command:

```bash
npm install --save-dev typegraphql-prisma
```

`typegraphql-prisma` is dependent on several packages for it to work properly.

```bash
npm install graphql-type-json graphql-fields
npm install --save-dev @types/graphql-fields
```

Once the dependencies are successfully installed, add a new generator in your `schema.prisma` file below the `client` generator as follows:

```groovy
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

generator typegraphql {
  provider = "typegraphql-prisma"
}
```

Run `npx prisma generate` to generate TypeGraphQL classes and CRUD resolvers based on your Prisma schema.

```bash
npx prisma generate
```

`typegraphql-prisma` emits the generated classes, enums and resolvers to `node_modules/@generated/typegraphql-prisma`.

It should be noted that in your subsequent migrations, the classes and resolvers TypeGraphQL generates will be automatically updated on running `npx prisma migrate dev`.

![Development Workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zby23fodrm0pp7phks67.png)

The final step is updating our resolvers in our Apollo Server:

```ts
// index.ts
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { resolvers } from "@generated/type-graphql";
import * as tq from 'type-graphql';

const prisma = new PrismaClient()

const app = async () => {
  const schema = await tq.buildSchema({ resolvers })

  const context = () => {
    return {
      prisma
    }
  }

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: http://localhost:4000')
  )
}
```

## Step 5: Test Your New GraphQL API

Start your GraphQL server with the following command:

```bash
npm run dev
```

Open [localhost:4000](http://localhost:4000) to interact with the GraphQL playground...and congratulations. 🎉



You've successfully automated building a CRUD API. Just to be sure explore **Docs** section of the playground and try out some queries and mutations:

### Create a New `Category`:

```graphql
mutation {
  createCategory(data: { name: "electronics" }) {
    id
    name
  }
}
```

### Create a New `Product`:
```graphql
mutation {
  createProduct(
    data: {
      name: "Google Pixel"
      sku: "90456123098"
      quantity: 1000
      categories: { connect: [{ id: 1 }] }
    }
  ) {
    id
    name
  }
}
```

### Query all Products:
```graphql
{
  products {
    id
    name
    quantity 
    sku
    categories{
      name
    }
    orders{
      id
    }
  }
}
```

Everything is running smoothly. Go ahead and pat yourself on the back for getting this far.

![](https://media.giphy.com/media/U7DFwka0lRgiIWKZnP/giphy.gif)

Feel free to explore other mutations and queries on the playground. 🙂

## Side Quest: Some `typegraphql-prisma` Wizardry 🧙🏾‍♂️

Alternatively, you can make specific CRUD operations, specific actions, modify generated functions that can be performed against your Prisma schema. This gives you more control of the operations exposed on your API. This approach also allows you to create your custom resolvers and add them to your GraphQL schema.

### Expose Specific Prisma CRUD operations
`typegraphql-prisma` allows you to expose selected CRUD operations on your API on your Prisma models.

```ts
import { 
  ProductCrudResolver, 
  CategoryCrudResolver 
} from "@generated/type-graphql";

const schema = await tq.buildSchema({
  resolvers: [
    ProductCrudResolver,
    CategoryCrudResolver
  ]
})
```

### Expose Specific Prisma Actions

To get more control over the GraphQL operations, you can expose, `typegraphql-prisma` allows you to expose specific Prisma operations from the generated types.

```ts
import { 
  CreateProductResolver, 
  UpdateProductResolver 
} from "@generated/type-graphql";

const schema = await tq.buildSchema({
  resolvers: [
    CreateProductResolver,
    UpdateProductResolver
  ]
})
```

TypeGraphQL allows you to add custom queries and mutations to your schema using the generated Prisma Client.

### Applying Custom Resolvers

The beauty of TypeGraphQL is that you can create custom resolvers such as authorization by creating its decorators. 

`typegraphql-prisma` generates the `applyResolversEnhanceMap` function and `ResolversEnhanceMap` to aid in the creation of a config object that allows you to add decorator functions.

```ts
import {
  ResolversEnhanceMap,
  applyResolversEnhanceMap,
} from "@generated/type-graphql";
import { Authorized } from "type-graphql";

const resolversEnhanceMap: ResolversEnhanceMap = {
  Category: {
    createCategory: [Authorized(Role.ADMIN)],
  },
};

applyResolversEnhanceMap(resolversEnhanceMap);
```

Learn more about other advanced operations you can apply to your GraphQL resolvers, such as custom resolvers, authorization, middleware and additional decorators to your Prisma schema and models [here](https://github.com/MichalLytek/typegraphql-prisma#advanced-usage).

### Generating the SDL

To enable viewing the SDL of your GraphQL API, make the following modification in your application:

```ts
  const schema = await tq.buildSchema({
    resolvers,
    emitSchemaFile: true
  })
```

For the application you just built, here's a preview of the `type User`'s queries and mutations that is generated:

```graphql
type Query {
  aggregateUser(cursor: UserWhereUniqueInput, orderBy: [UserOrderByInput!], skip: Int, take: Int, where: UserWhereInput): AggregateUser!
  findFirstUser(cursor: UserWhereUniqueInput, distinct: [UserScalarFieldEnum!], orderBy: [UserOrderByInput!], skip: Int, take: Int, where: UserWhereInput): User
  user(where: UserWhereUniqueInput!): User
  users(cursor: UserWhereUniqueInput, distinct: [UserScalarFieldEnum!], orderBy: [UserOrderByInput!], skip: Int, take: Int, where: UserWhereInput): [User!]!
}

type Mutation {
  createUser(data: UserCreateInput!): User!
  deleteManyUser(where: UserWhereInput): AffectedRowsOutput!
  deleteUser(where: UserWhereUniqueInput!): User
  updateManyUser(data: UserUpdateManyMutationInput!, where: UserWhereInput): AffectedRowsOutput!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  upsertUser(create: UserCreateInput!, update: UserUpdateInput!, where: UserWhereUniqueInput!): User!
}
```
You can learn more about this feature [here](https://typegraphql.com/docs/0.16.0/emit-schema.html).

## Conclusion

You have successfully built a CRUD GraphQL API by barely writing any code. Simple and fast. I hope you have enjoyed this tutorial. Feel free to share your thoughts, discussing what kind of tutorials or examples you would like to see more.

Explore the [prisma-examples](https://github.com/prisma/prisma-examples) to see how Prisma can fit in your stack. If you feel an example is missing, create an [issue](https://github.com/prisma/prisma/examples/issues/new). 😊

Happy hacking! 👩🏾‍💻👨🏾‍💻