import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  // Declara a classe "PrismaService", que estende a funcionalidade do "PrismaClient".
  // A classe implementa a interface "OnModuleInit" para executar uma lógica de inicialização no início do módulo.
  constructor(){
    super()
  }
  // O construtor chama o "super()" para inicializar a classe pai "PrismaClient", permitindo o uso de suas funcionalidades.
 
  
  async onModuleInit() {
    await this.$connect();
    // Este método é executado automaticamente quando o módulo é inicializado.
    // Ele estabelece uma conexão com o banco de dados usando o método "$connect()" do PrismaClient.
    
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
       // Esse método adiciona um "hook" para quando o processo estiver prestes a terminar ("beforeExit").
      // Quando o evento "beforeExit" é disparado, ele fecha a aplicação chamando "app.close()".
    });
  }
}

