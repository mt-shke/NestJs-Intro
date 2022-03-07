# Nest js Basics & Pattern

<details>
<summary>Setup & roadmap</summary>

## Setup

<details>
<summary>Install + docker & prisma </summary>

```js
// nest new nest-project-name
run server and auto compile
// npm run start:dev

create nest module
// nest g module user
```

docker & prisma

```js
// docker compose up dev-db -d
// docker ps
// docker logs 5d7460adefaf

// prisma
// npm i -D prisma
// npm i @prisma/client

// npx prisma init
// set compose db params in .env

// npx prisma --help
// npx prisma migrate dev

// allow importing schema model
// npx prisma generate

// npx prisma studio

prisma module service
// nest g module prisma
// nest g service prisma --no-spec
```

</details>

<details>
<summary>Basics: module - Pipe - argon2 - </summary>

```js
// npm run start:dev
// npx prisma studio

//  auth => imports [PrismaModule]
//  decorator, dto

//  class transformer - class validator - Pipe
// npm i --save class-validator class-transformer
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

// npm i argon2
// hash password && return user

// schema.prisma relation => settings unique
// npx prisma migrate dev

// package script
```

</details>

<details>
<summary>ConfigModule</summary>

app.module

```js
// npm i @nestjs/config && import in app.module
    ConfigModule.forRoot({ isGlobal: true }),

```

prisma.servce.ts

```js
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
```

</details>

</details>

# New code

<details>
<summary>/timeout /t 1</summary>

package.json

<!-- "timeout /t x" => wait x seconds  -->

```js
// custom script command with timeout function
 "db:dev:restart": "npm run db:dev:rm && npm run db:dev:up && timeout /t 1 && npm run prisma:dev:deploy",
```

</details>
