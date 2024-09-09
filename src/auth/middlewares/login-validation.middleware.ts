import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'; 

import { NextFunction, Request, Response } from 'express'; 

import { LoginRequestBody } from '../models/LoginRequestBody'; 

import { validate } from 'class-validator'; 

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
async use(req: Request, res: Response, next: NextFunction) {
  // Implementa o método "use" do middleware que processa a requisição.

  const body = req.body;
  // Obtém o corpo da requisição.

  const loginRequestBody = new LoginRequestBody();
  // Cria uma nova instância de "LoginRequestBody".

  loginRequestBody.email = body.email;
  loginRequestBody.password = body.password;
  // Preenche a instância com os dados da requisição.

  const validations = await validate(loginRequestBody);
  // Valida a instância "loginRequestBody" usando a função "validate".

  if (validations.length) {
    // Se houver erros de validação:
    throw new BadRequestException(
      validations.reduce((acc, curr) => {
        // Reduz a lista de erros de validação a uma lista de mensagens de erro.
        return [...acc, ...Object.values(curr.constraints)];
      }, []),
    );
    // Lança uma "BadRequestException" com as mensagens de erro.
  }

  next();
  // Se a validação for bem-sucedida, passa a requisição para o próximo middleware ou manipulador.
}
}
