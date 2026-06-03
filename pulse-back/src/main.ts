import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Activer CORS pour ton front local
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Pulse API')
    .setDescription('API documentation pour la plateforme Pulse')
    .setVersion('1.0')
    .addTag('pulse')
    .build();

  const document = SwaggerModule.createDocument(app as any, config);

  SwaggerModule.setup('api', app as any, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Swagger disponible sur: http://localhost:${port}/api`);
}

bootstrap();
