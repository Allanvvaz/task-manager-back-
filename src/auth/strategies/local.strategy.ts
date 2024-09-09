import { Injectable } from '@nestjs/common'; 

import { PassportStrategy } from '@nestjs/passport'; 

import { Strategy } from 'passport-local'; 

import { AuthService } from '../auth.service'; 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); 
    // Configura a estratégia para usar o campo 'email' como o campo de nome de usuário.
  }

  validate(email: string, password: string) {
    // Método chamado para validar as credenciais fornecidas (email e senha).

    return this.authService.validateUser(email, password); 
    // Chama o método "validateUser" do "AuthService" para verificar se o usuário existe e se a senha está correta.
  }
}
