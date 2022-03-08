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
//  decorator(@Post, @Body, @Req, @Injectables), dto

//  class transformer - class validator - Pipe
// npm i --save class-validator class-transformer
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

// npm i argon2
// hash password & verify

// schema.prisma relation => settings unique
// npx prisma migrate dev

// package script
```

</details>

<details>
<summary>Using env variable with ConfigModule</summary>

app.module

```js
// npm i @nestjs/config
// & import in app.module
    ConfigModule.forRoot({ isGlobal: true }),

```

prisma.servce.ts

```js
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

<details>
<summary>Manage Auth - jwt - strategy</summary>

```js
// npm install @nestjs/passport passport @nestjs/jwt passport-jwt
// npm i -D @types/passport-jwt
```

app.module

```js
// import jwt
// set jwt .env && configure jwt
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
```

auth.service

```js
// import jwtService & configService
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

// set jwt token functions
  signToken = async (
    userId: Number,
    email: String,
  ): Promise<{ access_token: string }> => {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  };

```

strategy

```js
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
}

// && import in auth.module providers
```

</details>

<details>
<summary>Guards</summary>

guard

```js
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
```

user.controller

```js
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser() {}
}
```

</details>

<details>
<summary>Custom Decorator</summary>

```js
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
```

</details>

## Testing

<details>
<summary>E2E Testing - Pactum</summary>

```js
// npm i -D pactum
// "test:e2e": "jest --watch --no-cache --config ./test/jest-e2e.json"
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
