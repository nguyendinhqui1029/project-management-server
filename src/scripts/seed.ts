import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import { DataSource } from 'typeorm';



async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  console.log('🧹 Deleting existing records...');
  await Promise.all([
    // dataSource.getRepository(OrderItemEntity).delete({}),
  ]);

  // Seed helpers
  // const parseDate = (value: any) => (value ? new Date(value) : null);

  // Services
  // const userService = app.get(UserService);



  console.log('✅ Done seeding!');
  await dataSource.destroy();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
