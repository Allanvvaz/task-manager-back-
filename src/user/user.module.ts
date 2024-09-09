import { Module } from '@nestjs/common'; 

import { UserController } from './user.controller'; 

import { UserService } from './user.service'; 

import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  // O array "imports" inclui o "PrismaModule", permitindo que os serviços e recursos definidos no "PrismaModule" estejam disponíveis neste módulo.

  controllers: [UserController], 
  // O array "controllers" registra o "UserController", que gerencia as requisições HTTP para os usuários.

  providers: [UserService], 
  // O array "providers" registra o "UserService", que fornece a lógica de negócios e interage com o banco de dados para operações relacionadas aos usuários.

  exports: [UserService], 
  // O array "exports" define que o "UserService" pode ser usado em outros módulos que importarem o "UserModule".
})
export class UserModule {} 
// Define o módulo "UserModule", agrupando os componentes relacionados aos usuários (controladores e serviços).
