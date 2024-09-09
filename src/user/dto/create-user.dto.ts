import { User } from '../entities/user.entity'; 

import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'; 
// Importa decorators do pacote "class-validator":
// "IsEmail" valida que o campo deve ser um e-mail válido.
// "IsString" valida que o campo deve ser uma string.
// "Matches" valida que o campo deve corresponder a uma expressão regular (regex).
// "MaxLength" e "MinLength" validam o comprimento da string, garantindo que o comprimento esteja dentro do intervalo especificado.

export class CreateUserDto extends User { 
  // Declara a classe "CreateUserDto" que estende a entidade "User", 
  // permitindo que este DTO (Data Transfer Object) herde as propriedades da entidade base e adicione validação específica.

  @IsEmail() 
  email: string; 
  // O campo "email" deve ser uma string que corresponde a um e-mail válido, 
  // garantido pelo decorator "IsEmail".

  @IsString() 
  @MinLength(4) 
  @MaxLength(20) 
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
    message: 'password too weak' 
  }) 
  password: string; 
  // O campo "password" deve ser uma string com comprimento entre 4 e 20 caracteres. 
  // A validação adicional garante que a senha tenha pelo menos uma letra maiúscula, uma letra minúscula, e um número ou caractere especial. 
  // Se não corresponder à expressão regular, uma mensagem personalizada é fornecida ("password too weak").

  @IsString() 
  name: string; 
  // O campo "name" deve ser uma string, garantido pelo decorator "IsString".
}
