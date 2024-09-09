import { Injectable } from '@nestjs/common'; 

import { JwtService } from '@nestjs/jwt'; 

import * as bcrypt from 'bcrypt'; 

import { UnauthorizedError } from './errors/unauthorized.error'; 

import { User } from '../user/entities/user.entity'; 

import { UserService } from '../user/user.service'; 

import { UserPayload } from './models/UserPayload'; 

import { UserToken } from './models/UserToken'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, 
    // Injeta o serviço de JWT para gerar e validar tokens.

    private readonly userService: UserService, 
    // Injeta o serviço de usuários para acessar e gerenciar dados de usuário.
  ) {}

  async login(user: User): Promise<UserToken> {
    // Método para criar um token JWT para um usuário autenticado.
    
    const payload: UserPayload = {
      sub: user.id, 
      // "sub" (subject) é o identificador do usuário.
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload), 
      // Gera um token JWT com a carga útil fornecida.
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    // Método para validar as credenciais de um usuário.
    
    const user = await this.userService.findByEmail(email); 
    // Encontra o usuário pelo e-mail.

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password); 
      // Compara a senha fornecida com a senha armazenada no banco de dados.

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined, 
          // Remove a senha do objeto de retorno.
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.', 
      // Lança um erro se o e-mail ou a senha estiverem incorretos.
    );
  }
}
