import * as dotenv from "dotenv";
dotenv.config();
import datasource from "./lib/datasource";
import LanguageResolver from "./resolvers/language.resolver";
import NoteResolver from "./resolvers/note.resolver";
import WilderResolver from "./resolvers/wilder.resolver";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";

import "reflect-metadata";
import cors from "cors";
import { json } from "body-parser";

const app = express();
const httpServer = http.createServer(app);

const start = async () => {
  await datasource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, LanguageResolver, NoteResolver],
    validate: false, //désactive partout le class-validator dans type-graphql, vous pouvez l'activer si besoin au cas par cas dans les options des arguments par exemple
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });
  // console.log(`🚀  Server ready at: ${url}`);

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    }),
    json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

start();
