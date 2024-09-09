import { Injectable } from '@nestjs/common'; 

import { PassportStrategy } from '@nestjs/passport'; 

import { ExtractJwt, Strategy } from 'passport-jwt'; 

import { UserFromJwt } from '../models/UserFromJwt'; 

import { UserPayload } from '../models/UserPayload'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      // Configura a estratégia para extrair o JWT do cabeçalho de autorização com o prefixo "Bearer".
      ignoreExpiration: false, 
      // Não ignora a expiração do token, ou seja, o token expirado será rejeitado.
      secretOrKey: process.env.JWT_SECRET, 
      // Define a chave secreta para verificar a assinatura do JWT, obtida das variáveis de ambiente.
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    // Método chamado para validar o payload do token JWT. 
    // Se a validação for bem-sucedida, ele retorna os dados do usuário que foram extraídos do payload.

    return {
      id: payload.sub, 
      // "sub" (subject) é o identificador do usuário.
      email: payload.email,
      name: payload.name,
    };
  }
}
