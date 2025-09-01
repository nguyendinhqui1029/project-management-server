import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'cert.pem')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const configService = app.get(ConfigService);
  const apiPath = configService.get<string>('API_PATH') || 'v1'; // Default to 'v1' if undefined

  // Add validation config
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field không có trong DTO
      forbidNonWhitelisted: true, // báo lỗi nếu có field thừa
      transform: true, // tự động transform kiểu dữ liệu
    }),
  );
  // Set a global prefix for all routes
  app.setGlobalPrefix(apiPath); // This sets the prefix for all routes globally, like `/v1/users`
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE', // specify allowed methods
    allowedHeaders: 'Content-Type, Authorization', // specify allowed headers
    credentials: true, // allow cookies or HTTP authentication
  });
  app.useGlobalInterceptors(app.get(ResponseInterceptor));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap', err);
  process.exit(1);
});
