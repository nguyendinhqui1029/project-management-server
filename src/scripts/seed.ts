import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import { DataSource } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { UserService } from '@services/user/user.service';

import USERS_MOCK from '@mocks/users.mock.json';
import PROJECT_MOCK from '@mocks/projects.mock.json';
import PLANNING_DOCUMENT_MOCK from '@mocks/planning-document.mock.json';
import PLANNING_DOCUMENT_DESCRIPTION_MOCK from '@mocks/planning-document-description.mock.json';
import PLANNING_DOCUMENT_VERSION_MOCK from '@mocks/planning-document-version.mock.json';
import TICKET_BOARD_MOCK from '@mocks/ticket-board.mock.json';
import TICKET_MOCK from '@mocks/tickets.mock.json';

import { CreateUserRequestBodyDto } from '@dto/user.dto';
import { PlanningDocumentVersionEntity } from '@entities/planning-document-versions.entity';
import { PlanningDocumentEntity } from '@entities/planning-documents.entity';
import { ProjectEntity } from '@entities/projects.entity';
import { RetroItemEntity } from '@entities/retro-items.entity';
import { SprintRetroEntity } from '@entities/sprint-retros.entity';
import { SprintPlanningEntity } from '@entities/sprint-plannings.entity';
import { MeetingEntity } from '@entities/meeting.entity';
import { PlanningDescriptionEntity } from '@entities/planning-descriptions.entity';
import { SprintEntity } from '@entities/sprints.entity';
import { TicketBoardEntity } from '@entities/ticket-board.entity';
import { TicketEntity } from '@entities/tickets.entity';
import { ProjectService } from '@services/project/project.service';
import { PlanningDocumentService } from '@services/planning-document/planning-document.service';
import { PlanningDescriptionsService } from '@services/planning-descriptions/planning-descriptions.service';
import { PlanningDocumentVersionService } from '@services/planning-document-version/planning-document-version.service';
import { TicketBoardService } from '@services/ticket-board/ticket-board.service';
import { TicketService } from '@services/ticket/ticket.service';

function getRandomInt(n: number, excludesIndex: number[]): number {
  let randomInt: number = 0;
  do {
    randomInt = Math.floor(Math.random() * n);
  } while (excludesIndex.includes(randomInt));
  excludesIndex.push(randomInt);
  return randomInt;
}

function parseDate(value: string): number | null {
  return value ? new Date(value).getTime() : null;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  console.log('⚡ Clearing database...');
  await dataSource.synchronize(true); // ⚡ Xoá toàn bộ schema và tạo lại

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  console.log('🧹 Deleting existing records...');
  await dataSource.query('SET FOREIGN_KEY_CHECKS=0;');

  // clear tất cả bảng
  await dataSource.getRepository(RetroItemEntity).clear();
  await dataSource.getRepository(SprintRetroEntity).clear();
  await dataSource.getRepository(SprintPlanningEntity).clear();
  await dataSource.getRepository(SprintEntity).clear();
  await dataSource.getRepository(TicketEntity).clear();
  await dataSource.getRepository(TicketBoardEntity).clear();
  await dataSource.getRepository(PlanningDocumentVersionEntity).clear();
  await dataSource.getRepository(PlanningDescriptionEntity).clear();
  await dataSource.getRepository(PlanningDocumentEntity).clear();
  await dataSource.getRepository(MeetingEntity).clear();
  await dataSource.getRepository(ProjectEntity).clear();
  await dataSource.getRepository(UserEntity).clear();

  await dataSource.query('SET FOREIGN_KEY_CHECKS=1;');

  // Seed helpers
  // const parseDate = (value: any) => (value ? new Date(value) : null);

  // Services
  console.log('🌱 Seeding users...');
  const userService = app.get(UserService);
  const userList: UserEntity[] = [];
  for (const item of USERS_MOCK) {
    const user = await userService.create(item as CreateUserRequestBodyDto);
    userList.push(user);
  }

  console.log('🌱 Seeding projects...');
  const projectService = app.get(ProjectService);
  const projectList: ProjectEntity[] = [];
  for (const item of PROJECT_MOCK) {
    const excludesUserListIndex: number[] = [];
    const project = await projectService.create({
      ...item,
      isUnlimited: false,
      startDate: parseDate(item.startDate) || 0,
      endDate: parseDate(item.endDate) || 0,
      owner: { id: userList[getRandomInt(userList.length, [])].id },
      participants: [
        { id: userList[getRandomInt(userList.length, excludesUserListIndex)].id },
        { id: userList[getRandomInt(userList.length, excludesUserListIndex)].id },
        { id: userList[getRandomInt(userList.length, excludesUserListIndex)].id },
      ],
    });
    projectList.push(project);
  }

  console.log('🌱 Seeding planning documents...');
  const planningDocumentService = app.get(PlanningDocumentService);
  const planningDocumentList: PlanningDocumentEntity[] = [];
  const excludesPlanningDocumentUserListIndex: number[] = [];
  const excludesPlanningDocumentProjectListIndex: number[] = [];
  for (const item of PLANNING_DOCUMENT_MOCK) {
    const planningDocument = await planningDocumentService.create({
      ...item,
      project: {
        id: projectList[getRandomInt(projectList.length, excludesPlanningDocumentProjectListIndex)]
          .id,
      },
      createdBy: {
        id: userList[getRandomInt(userList.length, excludesPlanningDocumentUserListIndex)].id,
      },
    });
    planningDocumentList.push(planningDocument);
  }

  console.log('🌱 Seeding planning documents description...');
  const planningDocumentDescriptionService = app.get(PlanningDescriptionsService);
  const planningDocumentDescriptionList: PlanningDescriptionEntity[] = [];
  for (const item of PLANNING_DOCUMENT_DESCRIPTION_MOCK) {
    const planningDocumentDescription = await planningDocumentDescriptionService.create({
      ...item,
      documents: [{ id: planningDocumentList[getRandomInt(planningDocumentList.length, [])].id }],
      createdBy: { id: planningDocumentList[getRandomInt(planningDocumentList.length, [])].id },
    });
    planningDocumentDescriptionList.push(planningDocumentDescription);
  }

  console.log('🌱 Seeding planning documents version...');
  const planningDocumentVersionService = app.get(PlanningDocumentVersionService);
  const planningDocumentVersionList: PlanningDocumentVersionEntity[] = [];
  for (const item of PLANNING_DOCUMENT_VERSION_MOCK) {
    const planningDocumentVersion = await planningDocumentVersionService.create({
      ...item,
      document: { id: planningDocumentList[getRandomInt(planningDocumentList.length, [])].id },
      createdBy: { id: planningDocumentList[getRandomInt(planningDocumentList.length, [])].id },
    });
    planningDocumentVersionList.push(planningDocumentVersion);
  }

  console.log('🌱 Seeding ticket boards...');
  const ticketBoardService = app.get(TicketBoardService);
  const ticketBoardList: TicketBoardEntity[] = [];
  for (const item of TICKET_BOARD_MOCK) {
    const ticketBoard = await ticketBoardService.create({
      ...item,
      project: { id: projectList[getRandomInt(projectList.length, [])].id },
    });
    ticketBoardList.push(ticketBoard);
  }

  console.log('🌱 Seeding tickets...');
  const ticketService = app.get(TicketService);
  const ticketList: TicketEntity[] = [];
  for (const item of TICKET_MOCK) {
    const ticket = await ticketService.create({
      ...item,
      board: { id: ticketBoardList[getRandomInt(ticketBoardList.length, [])].id },
      assignee: { id: userList[getRandomInt(userList.length, [])].id },
      reporter: { id: userList[getRandomInt(userList.length, [])].id },
    } as TicketEntity);
    ticketList.push(ticket);
  }

  console.log('✅ Done seeding!');
  await dataSource.destroy();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
