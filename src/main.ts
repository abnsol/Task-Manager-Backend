// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service'; // Import PrismaService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('A simple REST API for managing tasks')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Enable NestJS's shutdown hooks
  // This will ensure that OnModuleDestroy is called when the app receives a shutdown signal (e.g., SIGTERM)
  app.enableShutdownHooks();

  await app.listen(3000);

  // OPTIONAL: If you want to explicitly call enableShutdownHooks on your PrismaService
  // (though OnModuleDestroy is usually enough)
  // const prismaService = app.get(PrismaService);
  // prismaService.enableShutdownHooks(app); // This is where you would call it
}
bootstrap();
