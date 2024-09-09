import { Task } from "src/task/entities/task.entity"; 


export class User { 
  // Declara a classe "User" que define a estrutura de um usuário.

  id?: number; 
  // O campo "id" é opcional (indicado pelo "?") e representa o identificador único do usuário.
  // É do tipo "number", e pode não estar presente em todas as instâncias da classe, especialmente para novos usuários ainda não persistidos no banco de dados.

  email: string; 
  // O campo "email" é obrigatório e deve ser uma string, representando o endereço de e-mail do usuário.

  password: string; 
  // O campo "password" é obrigatório e deve ser uma string, representando a senha do usuário.

  name: string; 
  // O campo "name" é obrigatório e deve ser uma string, representando o nome do usuário.

  tasks?: Task[]; 
  // O campo "tasks" é opcional e é um array de objetos "Task". 
  // Ele representa as tarefas associadas ao usuário. O uso do "?" indica que o campo pode não estar presente.
}
