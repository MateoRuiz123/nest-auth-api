import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Dominio de tu front
    credentials: true, // Permite el envío de cookies
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
