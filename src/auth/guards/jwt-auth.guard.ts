
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';


import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

import { UnauthorizedError } from '../errors/unauthorized.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Define a classe "JwtAuthGuard" que estende "AuthGuard" configurado para o 'jwt' strategy.

  constructor(private reflector: Reflector) {
    super();
  }
  // O construtor injeta o serviço "Reflector" para acessar os metadados dos decorators.

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    // Define o método "canActivate" que determina se a requisição deve ser autorizada.

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // Verifica se a rota é pública consultando os metadados associados à rota.

    if (isPublic) {
      return true;
      // Se a rota for pública, permite o acesso.
    }

    const canActivate = super.canActivate(context);
    // Chama o método "canActivate" da classe base para realizar a verificação de autenticação.

    if (typeof canActivate === 'boolean') {
      return canActivate;
      // Se o resultado for um booleano, retorna o resultado diretamente.
    }

    const canActivatePromise = canActivate as Promise<boolean>;
    // Se o resultado for uma Promise, converte o resultado para "Promise<boolean>".

    return canActivatePromise.catch((error) => {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException(error.message);
        // Se o erro for uma instância de "UnauthorizedError", lança uma "UnauthorizedException" com a mensagem do erro.
      }

      throw new UnauthorizedException();
      // Caso contrário, lança uma "UnauthorizedException" genérica.
    });
  }
}
