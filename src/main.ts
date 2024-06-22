import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';

import { AppModule } from './app.module';

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION,
  collection: 'userSessions'
});

export const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 },
  store
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
