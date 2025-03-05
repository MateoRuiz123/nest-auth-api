import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Representa la entidad de usuario en la base de datos.
 */
@Entity()
export class User {
  /**
   * Identificador único del usuario.
   */
  @PrimaryGeneratedColumn() //* Esto es un identificador único generado automáticamente para cada usuario.
  id: number;

  /**
   * Nombre de usuario del usuario.
   */
  @Column() //* Esto es el nombre de usuario que identifica al usuario.
  username: string;

  /**
   * Contraseña del usuario.
   */
  @Column() //* Esto es la contraseña del usuario para autenticación.
  password: string;
}
