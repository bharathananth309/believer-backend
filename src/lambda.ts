// lambda.ts
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';

let cachedServer;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    app.enableCors({
      origin: '*',
      credentials: true,
    });

    app.setGlobalPrefix('api');

    await app.init();
    cachedServer = createServer(expressApp);
  }
  return cachedServer;
}

export const handler = async (event, context) => {
  const server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
};
