import { IsBoolean, IsOptional, IsString } from "class-validator"; 


export class UpdateTaskDto { 
  // Declara a classe "UpdateTaskDto", que define o formato dos dados para a atualização de uma tarefa.
  // Como é um DTO de atualização, todos os campos são opcionais, pois o cliente pode optar por atualizar apenas alguns deles.

  @IsOptional()
  @IsString()
  title?: string; 
  // O campo "title" é opcional e, se fornecido, deve ser uma string.
  

  @IsOptional()
  @IsString()
  description?: string; 
  // O campo "description" é opcional e, se fornecido, deve ser uma string.

  @IsOptional()
  ownerId?: number; 
  // O campo "ownerId" é opcional e deve ser do tipo "number", representando o ID do dono da tarefa.
  // Neste caso, não há validação adicional para o tipo, pois já é definido como "number".

  @IsOptional()
  @IsBoolean()
  done?: boolean; 
  // O campo "done" é opcional e, se fornecido, deve ser um valor booleano (true ou false).
}
