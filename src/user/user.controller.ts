import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'; 


import { CreateUserDto } from './dto/create-user.dto'; 

import { UserService } from './user.service'; 

import { UpdateUserDto } from './dto/update-user.dto'; 

@Controller('user') 
// Define o controlador para o caminho base 'user'. Todas as rotas deste controlador estarão sob '/user'.

export class UserController {
  constructor(private readonly userService: UserService) {}
  // O construtor injeta o serviço "UserService" que será usado para manipular as operações relacionadas aos usuários.

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Define um manipulador para a rota POST '/user'. 
    // Recebe os dados do corpo da requisição (usando @Body) no formato definido pelo DTO "CreateUserDto" e chama o método "create" do serviço.
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    // Define um manipulador para a rota GET '/user', que retorna todos os usuários. 
    // Chama o método "findAll" do serviço para buscar todos os usuários.
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number){
    return this.userService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    // Define um manipulador para a rota PUT '/user/:id', onde ":id" é um parâmetro dinâmico. 
    // Atualiza o usuário correspondente ao "id" com os dados fornecidos no corpo da requisição (DTO "UpdateUserDto").
    // A função é marcada como "async" para permitir o uso de await na chamada ao serviço.
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // Define um manipulador para a rota DELETE '/user/:id'. 
    // Deleta o usuário com o ID fornecido através do parâmetro da rota.
    // A função é marcada como "async" para permitir o uso de await na chamada ao serviço.
    return this.userService.delete(id);
  }
}
