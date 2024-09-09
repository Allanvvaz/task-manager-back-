import { Module } from '@nestjs/common'; 

import { PrismaModule } from '../prisma/prisma.module'; 

import { TaskController } from './task.controller'; 

import { TaskService } from './task.service'; 

import { PrismaService } from 'src/prisma/prisma.service'; 

@Module({
  imports: [PrismaModule], 
  // O array "imports" declara que o módulo "PrismaModule" está sendo importado, 
  // o que significa que os serviços fornecidos pelo "PrismaModule" estarão disponíveis para uso no "TaskModule".

  controllers: [TaskController], 
  // O array "controllers" define que o "TaskController" está registrado neste módulo,
  // ou seja, as rotas e os manipuladores de requisições para tarefas estarão acessíveis.

  providers: [TaskService, PrismaService], 
  // O array "providers" registra os serviços "TaskService" e "PrismaService", 
  // indicando que eles serão injetados em outros componentes que precisarem deles, como o "TaskController".

  exports: [TaskService], 
  // O array "exports" indica que o "TaskService" estará disponível para outros módulos que importarem o "TaskModule".
})
export class TaskModule {} 
