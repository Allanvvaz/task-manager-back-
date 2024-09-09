import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'; 


import { AuthService } from './auth.service'; 

import { LocalAuthGuard } from './guards/local-auth.guard'; 

import { AuthRequest } from './models/AuthRequest'; 

import { IsPublic } from './decorators/is-public.decorator'; 

@Controller() 
export class AuthController {
constructor(private readonly authService: AuthService) {}
// O construtor injeta o serviço "AuthService" para ser usado no controlador.

@IsPublic()
@UseGuards(LocalAuthGuard)
@Post('login')
@HttpCode(HttpStatus.OK)
async login(@Request() req: AuthRequest) {
  // Manipulador de rota para a requisição POST na rota "/login".

  return this.authService.login(req.user);
  // Chama o método "login" do "AuthService", passando o usuário da requisição autenticada.
}
}
