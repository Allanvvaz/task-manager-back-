import { IsNotEmpty, IsOptional, IsString } from "class-validator"; 


export class CreateTaskDto { 
  // Declara a classe "CreateTaskDto", que é usada para definir o formato esperado dos dados ao criar uma nova tarefa (DTO significa Data Transfer Object).

  @IsNotEmpty() 
  @IsString()
  title: string; 
  // O campo "title" é obrigatório (deve ter um valor) e deve ser do tipo string.

  @IsOptional()
  @IsString()
  description?: string; 
  // O campo "description" é opcional (não precisa estar presente) e, se fornecido, deve ser uma string.
  

  @IsNotEmpty()
  ownerId: number; 
  // O campo "ownerId" é obrigatório e deve conter o ID do dono da tarefa. Aqui, não há necessidade de validar como string, já que o tipo é "number".
}
