import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'; 


import { JwtModule } from '@nestjs/jwt'; 

import { PassportModule } from '@nestjs/passport'; 

import { UserModule } from '../user/user.module'; 

import { AuthController } from './auth.controller'; 

import { AuthService } from './auth.service'; 

import { JwtStrategy } from './strategies/jwt.strategy'; 

import { LocalStrategy } from './strategies/local.strategy'; 

import { LoginValidationMiddleware } from './middlewares/login-validation.middleware'; 

@Module({
  imports: [
    UserModule, 
    // Importa o módulo "UserModule" para que o módulo de autenticação possa acessar os serviços de usuário.

    PassportModule, 
    // Importa o módulo "PassportModule" para a integração com Passport.

    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      // Define a chave secreta para assinatura dos JWTs, obtida de variáveis de ambiente.

      signOptions: { expiresIn: '30d' }, 
      // Define o tempo de expiração dos JWTs como 30 dias.
    }),
  ],
  controllers: [AuthController], 
  // Define o controlador "AuthController" para gerenciar as rotas de autenticação.

  providers: [AuthService, LocalStrategy, JwtStrategy], 
  // Define os provedores "AuthService", "LocalStrategy" e "JwtStrategy" para serem injetados no módulo.
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
    // Aplica o middleware "LoginValidationMiddleware" à rota "login" para validar o corpo da requisição.
  }
}
