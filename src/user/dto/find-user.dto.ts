import { IsEmail, IsString } from 'class-validator'; 


import { User } from '../entities/user.entity'; 

import { PartialType } from '@nestjs/mapped-types'; 

export class FindUserDto extends PartialType(User) { 
  // Declara a classe "FindUserDto" que estende a versão parcial da entidade "User".
  // Isso significa que "FindUserDto" incluirá todas as propriedades de "User" como opcionais, além das propriedades adicionadas ou modificadas.

  @IsEmail() 
  email: string; 
  // O campo "email" deve ser uma string que corresponde a um e-mail válido, garantido pelo decorator "IsEmail".

  @IsString() 
  name: string; 
  // O campo "name" deve ser uma string, garantido pelo decorator "IsString".
}
