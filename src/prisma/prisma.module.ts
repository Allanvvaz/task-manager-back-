import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Define "PrismaService" como um provedor, permitindo que seja injetado em outras partes da aplicação
  exports: [PrismaService] // Expõe "PrismaService" para que outros módulos possam usá-lo ao importar o PrismaModule
})
export class PrismaModule {}
