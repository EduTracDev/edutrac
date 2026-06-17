import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {PrismaService} from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';


describe('App e2e', () => {
  let app:INestApplication;
  let prisma:PrismaService;

  beforeAll(async() => {
    const moduleRef = Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = (await moduleRef).createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));
    await app.init();
    await app.listen(3333);

    pactum.request.setBaseUrl('http://localhost:3333');

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  })
  afterAll(async() => {
    await app.close();
  })


 describe("auth", () => {
    const dto: CreateUserDto = {
      email: "buchidevv@gmail.com",
      password: "1235636773" 
    }
    describe("signup", () => {
      it("should create user with valid credentials", async() => {
        return pactum
        .spec()
        .post('/auth/signup',)
        .withBody(dto)
        .expectStatus(201)
      });
      it('should throw error if email field is empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
      })
      it('should throw error if invalid email format is provided', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: "teueyeufuruy",
          password: dto.password
        })
        .expectStatus(400)
      })
      it('should throw error if password is empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email,
          password: ""
        })
        .expectStatus(400)
      })
    });
    describe("signin", () => {
      it('should login user with correct credentials', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(201)
        .stores('userAt', 'access_token')
      })
      it('should throw error if email field is empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password:dto.password
        })
        .expectStatus(400)
      })
      it('should throw error if password field is incorrect', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email,
          password: "3738383h387"
        })
        .expectStatus(400)
      })
    });
  });
})
