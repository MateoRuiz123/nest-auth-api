import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'centerbeam.proxy.rlwy.net',
      port: 44114,
      username: 'postgres',
      password: 'pgSxzkVMzezwcVBhEVDOdLceBRkcoFiW',
      database: 'nestauth', // Nombre de la BD (asegúrate de que exista o usa synchronize)
      entities: [User, Task],
      synchronize: true, // Sólo para desarrollo; en producción se recomienda migraciones
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '14122004',
    //   database: 'nestauth', // Nombre de la BD (asegúrate de que exista o usa synchronize)
    //   entities: [User, Task],
    //   synchronize: true, // Sólo para desarrollo; en producción se recomienda migraciones
    // }),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
