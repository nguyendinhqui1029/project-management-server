import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebsocketModule } from '@websocket/websocket.module';
import { WebsocketGateway } from '@websocket/websocket.gateway';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { UserService } from './services/user/user.service';
import { MeetingService } from './services/meeting/meeting.service';
import { PlanningDocumentService } from './services/planning-document/planning-document.service';
import { ProjectService } from './services/project/project.service';
import { SprintPlanningService } from './services/sprint-planning/sprint-planning.service';
import { SprintRetroService } from './services/sprint-retro/sprint-retro.service';
import { SprintService } from './services/sprint/sprint.service';
import { TicketBoardService } from './services/ticket-board/ticket-board.service';
import { TicketService } from './services/ticket/ticket.service';
import { MeetingController } from './controllers/meeting/meeting.controller';
import { PlanningDocumentController } from './controllers/planning-document/planning-document.controller';
import { ProjectController } from './controllers/project/project.controller';
import { SprintRetroController } from './controllers/sprint-retro/sprint-retro.controller';
import { SprintPlanningController } from './controllers/sprint-planning/sprint-planning.controller';
import { SprintController } from './controllers/sprint/sprint.controller';
import { TicketBoardController } from './controllers/ticket-board/ticket-board.controller';
import { TicketController } from './controllers/ticket/ticket.controller';
import { UserController } from './controllers/user/user.controller';
import { UserEntity } from '@entities/users.entity';
import { ProjectEntity } from '@entities/projects.entity';
import { TicketEntity } from '@entities/tickets.entity';
import { MeetingEntity } from '@entities/meeting.entity';
import { PlanningDocumentEntity } from '@entities/planning-documents.entity';
import { PlanningDescriptionEntity } from '@entities/planning-descriptions.entity';
import { PlanningDocumentVersionEntity } from '@entities/planning-document-versions.entity';
import { TicketBoardEntity } from '@entities/ticket-board.entity';
import { SprintEntity } from '@entities/sprints.entity';
import { SprintPlanningEntity } from '@entities/sprint-plannings.entity';
import { SprintRetroEntity } from '@entities/sprint-retros.entity';
import { RetroItemEntity } from '@entities/retro-items.entity';
import { PlanningDescriptionsService } from './services/planning-descriptions/planning-descriptions.service';
import { PlanningDocumentVersionService } from './services/planning-document-version/planning-document-version.service';
import { TodoEntity } from '@entities/todo.entity';

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
        },
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      ProjectEntity,
      TicketEntity,
      MeetingEntity,
      PlanningDocumentEntity,
      PlanningDescriptionEntity,
      PlanningDocumentVersionEntity,
      TicketBoardEntity,
      SprintEntity,
      SprintRetroEntity,
      SprintPlanningEntity,
      RetroItemEntity,
      TodoEntity,
    ]),
  ],
  controllers: [
    AppController,
    MeetingController,
    PlanningDocumentController,
    ProjectController,
    SprintRetroController,
    SprintPlanningController,
    SprintController,
    TicketBoardController,
    TicketController,
    UserController,
  ],
  providers: [
    AppService,
    WebsocketGateway,
    ResponseInterceptor,
    UserService,
    MeetingService,
    PlanningDocumentService,
    ProjectService,
    SprintPlanningService,
    SprintRetroService,
    SprintService,
    TicketBoardService,
    TicketService,
    PlanningDescriptionsService,
    PlanningDocumentVersionService,
  ],
})
export class AppModule {}
