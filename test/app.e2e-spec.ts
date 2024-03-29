import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduelRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduelRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it.todo('should past');
  it.todo('should past 2');
});
