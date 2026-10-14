import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app_module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
