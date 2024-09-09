import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'; 

import { AuthGuard } from '@nestjs/passport'; 

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
// Define a classe "LocalAuthGuard" que estende "AuthGuard" configurado para a estratégia 'local'.

canActivate(context: ExecutionContext) {
  return super.canActivate(context);
  // Chama o método "canActivate" da classe base para verificar a autorização usando a estratégia local.
}

handleRequest(err, user) {
  // Define o método "handleRequest" que é chamado após a autenticação para processar o resultado.

  if (err || !user) {
    throw new UnauthorizedException(err?.message);
    // Se houver um erro ou se o usuário não for autenticado, lança uma exceção de "UnauthorizedException".
  }

  return user;
  // Se a autenticação for bem-sucedida, retorna o usuário autenticado.
}
}
