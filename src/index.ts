import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { LoginResolver } from './modules/user/Login';
import { MeResolver } from './modules/user/Me';
import { RegisterResolver } from './modules/user/Register';
import { checkUser } from './checkUser';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MeResolver, RegisterResolver, LoginResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req, user: req.user }),
  });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );
  app.use(checkUser);

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
};

main();
