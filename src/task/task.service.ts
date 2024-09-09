import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';

import { Task } from './entities/task.entity';

@Injectable()
// O decorator "Injectable" indica que a classe pode ser injetada em outros componentes do sistema.
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  // O construtor injeta o serviço Prisma para realizar as operações de banco de dados.

  async create(createTaskDto: CreateTaskDto) {
    // O método "create" cria uma nova tarefa com os dados fornecidos no DTO "CreateTaskDto".
    try {
      const task = await this.prisma.task.create({
        data: createTaskDto,
        // A tarefa é criada no banco de dados usando os dados do DTO.
      });
      return task; // Retorna a tarefa criada.
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar tarefa.');
      // Captura e trata qualquer erro que ocorra durante a criação da tarefa.
    }
  }

  async findAll() {
    // O método "findAll" busca todas as tarefas.
    try {
      return await this.prisma.task.findMany({
        include: {
          owner: {
            select: { id: true, name: true },
            // Inclui os detalhes do dono da tarefa (ID e nome) nas tarefas retornadas.
          },
        },
      });
    } catch (error) {
      throw new Error('Erro ao buscar tarefas.');
      // Captura e trata erros ao buscar as tarefas.
    }
  }

  async findById(id: number): Promise<Task> {
    // O método "findById" busca uma tarefa específica pelo seu ID.
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
        include: {
          owner: true,
          // Inclui todas as informações do dono da tarefa.
        },
      });
      console.log(task)
      if (!task) throw new Error(`Tarefa não encontrada para o ID: ${id}`);
      // Lança um erro se a tarefa não for encontrada.
      return task; // Retorna a tarefa encontrada.
    } catch (error) {
      console.error(`Erro ao buscar tarefa com ID ${id}:`, error);
      throw new Error('Erro ao buscar tarefa.');
      // Captura e trata erros ao buscar a tarefa.
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    // O método "update" atualiza uma tarefa com base no ID e nos dados fornecidos pelo DTO "UpdateTaskDto".
    try {
      const task = await this.findById(id);
      if (!task) throw new Error(`Tarefa não encontrada para o ID: ${id}`);
      // Verifica se a tarefa existe antes de tentar atualizá-la.
      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
        // Atualiza a tarefa no banco de dados com os novos dados fornecidos.
      });
    } catch (error) {
      throw new Error('Erro ao atualizar a tarefa');
      // Captura e trata erros ao atualizar a tarefa.
    }
  }

  async delete(id: number) {
    // O método "delete" exclui uma tarefa pelo seu ID.
    try {
      const task = await this.findById(id);
      if (!task) throw new Error(`Tarefa não encontrada para o ID: ${id}`);
      // Verifica se a tarefa existe antes de excluí-la.
      await this.prisma.task.delete({
        where: { id },
        // Exclui a tarefa do banco de dados.
      });

      return `Tarefa: ${task.title} excluída com sucesso.`;
      // Retorna uma mensagem confirmando que a tarefa foi excluída.
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    throw new Error(`Erro ao deletar a tarefa: ${error.message}`);
      // Captura e trata erros ao excluir a tarefa.
    }
  }
}
