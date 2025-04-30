import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Allow your React frontend
    credentials: true, // If you're sending cookies or Authorization headers
  });

  // Set the global prefix for all endpoints
  app.setGlobalPrefix('api'); // This ensures all routes are prefixed with /api

  const config = new DocumentBuilder()
    .setTitle('Believer-Backend API')
    .setDescription('Endpoints to test Believer-Backend functionality')
    .setVersion('1.0')
    .addBearerAuth() // <-- To test protected routes with token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Accessible at /api

  await app.listen(3000);
}
bootstrap();
