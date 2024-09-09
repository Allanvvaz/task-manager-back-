import { User } from "@prisma/client"; 


export class Task { 
  // Declara uma classe "Task" que serve como um modelo de tarefa (task) na aplicação.

  id?: number; 
  // O campo "id" é opcional (indicado pelo "?") e representa o identificador único da tarefa. 
  // É do tipo "number", e como é opcional, ele pode não estar presente em algumas instâncias da classe, como em tarefas que ainda não foram salvas no banco de dados.

  title: string; 
  // O campo "title" é obrigatório e deve ser uma string, representando o título da tarefa.

  description: string; 
  // O campo "description" também é obrigatório e deve ser uma string, representando uma descrição da tarefa.

  ownerId: number; 
  // O campo "ownerId" é obrigatório e deve ser um número, representando o ID do dono da tarefa (um usuário).

  owner: User; 
  // O campo "owner" é obrigatório e é do tipo "User", que foi importado do Prisma. 
  // Ele representa a relação entre a tarefa e o usuário que a possui.

  done: boolean; 
  // O campo "done" é obrigatório e é um booleano, indicando se a tarefa foi concluída ou não (true ou false).
}
