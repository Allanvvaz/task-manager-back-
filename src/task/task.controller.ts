import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
// Define o controlador para o caminho base 'task'. Todas as rotas deste controlador estarão sob '/task'.
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  // O construtor injeta o serviço "TaskService" que será usado para manipular as operações relacionadas às tarefas.

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    // Define um manipulador para a rota POST '/task'.
    // Ele recebe os dados do corpo da requisição (usando @Body) no formato definido pelo DTO "CreateTaskDto" e chama o método "create" do serviço.
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    // Define um manipulador para a rota GET '/task', que retorna todas as tarefas.
    // Ele chama o método "findAll" do serviço para buscar todas as tarefas.
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    // Define um manipulador para a rota GET '/task/:id', onde ":id" é um parâmetro dinâmico.
    // Ele busca uma tarefa específica pelo seu ID, que é extraído da rota usando @Param.
    return this.taskService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    // Define um manipulador para a rota PUT '/task/:id'.
    // Ele atualiza a tarefa correspondente ao "id" com os dados fornecidos no corpo da requisição (DTO "UpdateTaskDto").
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    // Define um manipulador para a rota DELETE '/task/:id'.
    // Ele deleta a tarefa com o ID fornecido através do parâmetro da rota.
    return this.taskService.delete(id);
  }
}
