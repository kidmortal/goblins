import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerCss } from './swaggerCss';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Goblins api')
    .setDescription('The Goblins API description')
    .setVersion('1.0')
    .addTag('goblins')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('goblin', app, document, {
    customCss: SwaggerCss,
    customSiteTitle: 'Goblins API',
  });
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
