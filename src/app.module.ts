import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia si es necesario
      port: 5432, // Puerto por defecto de Postgres
      username: 'postgres', // Tu usuario de Postgres
      password: '14122004', // Tu password de Postgres
      database: 'nestauth', // Nombre de la BD (asegúrate de que exista o usa synchronize)
      entities: [User],
      synchronize: true, // Sólo para desarrollo; en producción se recomienda migraciones
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
