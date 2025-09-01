import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebsocketModule } from '@websocket/websocket.module';
import { WebsocketGateway } from '@websocket/websocket.gateway';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from '@interceptors/response.interceptor';

@Module({
  imports: [
    HttpModule,
    WebsocketModule,
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigService có thể được sử dụng ở mọi nơi
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          type: 'mysql',
          host: config.get<string>('MYSQL_HOST'),
          port: 3306,
          username: config.get<string>('MYSQL_ROOT_USERNAME'),
          password: config.get<string>('MYSQL_ROOT_PASSWORD'),
          database: config.get<string>('MYSQL_DATABASE'),
          autoLoadEntities: true,
          synchronize: true, // ⚠️ Chỉ bật khi DEV, PROD thì tắt
          extra: {
            ssl: false,
            allowPublicKeyRetrieval: true,
          }
        }),
    }),
    TypeOrmModule.forFeature([]), // UserEntity,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway, ResponseInterceptor],
})
export class AppModule {}
