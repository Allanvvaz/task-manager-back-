import { Injectable, NotFoundException } from '@nestjs/common'; 

import { Prisma } from '@prisma/client'; 

import * as bcrypt from 'bcrypt'; 

import { PrismaService } from '../prisma/prisma.service'; 

import { CreateUserDto } from './dto/create-user.dto'; 

import { User } from './entities/user.entity'; 

import { FindUserDto } from './dto/find-user.dto'; 

import { UpdateUserDto } from './dto/update-user.dto'; 

import { NotFoundError } from 'rxjs'; 

@Injectable() 
export class UserService { 
  constructor(private readonly prisma: PrismaService) {} 
  // O construtor injeta o serviço "PrismaService", que é usado para acessar e manipular os dados no banco de dados.

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Define um método assíncrono para criar um novo usuário.
    try {
      const data: Prisma.UserCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
        // Hash a senha com um salt de 10 para segurança.
      };

      const createdUser = await this.prisma.user.create({ data });
      // Cria o usuário no banco de dados com os dados fornecidos.

      return {
        ...createdUser,
        password: undefined,
        // Retorna o usuário criado, mas sem a senha, por questões de segurança.
      };
    } catch (error) {
      throw error;
      // Lança qualquer erro que ocorra durante o processo de criação.
    }
  }

  findByEmail(email: string) {
    // Define um método para encontrar um usuário por e-mail.
    try {
      return this.prisma.user.findUnique({ where: { email } });
      // Retorna o usuário correspondente ao e-mail fornecido.
    } catch (error) {
      throw error;
      // Lança qualquer erro que ocorra durante a busca.
    }
  }

  async findAll(): Promise<FindUserDto[]> {
    // Define um método assíncrono para encontrar todos os usuários.
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
        // Busca todos os usuários, excluindo a senha dos resultados.
      });
    } catch (error) {
      throw error;
      // Lança qualquer erro que ocorra durante a busca.
    }
  }

  async findById(id: number): Promise<User> {
    // Define um método assíncrono para encontrar um usuário por ID.
    try {
      return await this.prisma.user.findUnique({ where: { id } });
      // Retorna o usuário correspondente ao ID fornecido.
    } catch (error) {
      throw error;
      // Lança qualquer erro que ocorra durante a busca.
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Define um método assíncrono para atualizar um usuário existente.
    try {
      const user = await this.findById(id);
      // Encontra o usuário pelo ID.

      if (user) {
        return await this.prisma.user.update({
          where: { id },
          data: { ...updateUserDto },
          select: {
            id: true,
            name: true,
            email: true,
          },
          // Atualiza o usuário com os dados fornecidos e retorna o usuário atualizado.
        });
      }
    } catch (error) {
      throw error;
      // Lança qualquer erro que ocorra durante a atualização.
    }
  }

  async delete(id: number) {
    // Define um método assíncrono para deletar um usuário.
    try {
      const user = await this.findById(id);
      // Encontra o usuário pelo ID.

      if (!user) {
        throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
        // Lança uma exceção se o usuário não for encontrado.
      }

      const deletedUser = await this.prisma.user.delete({
        where: { id },
        select: {
          name: true,
        },
        // Deleta o usuário e retorna o nome do usuário deletado.
      });

      console.log(deletedUser);
      return `Usuário ${deletedUser.name} excluído com sucesso`;
      // Retorna uma mensagem de sucesso após a exclusão.
    } catch (error) {
      throw error;
      // Lança qualquer erro que ocorra durante a exclusão.
    }
  }
}
