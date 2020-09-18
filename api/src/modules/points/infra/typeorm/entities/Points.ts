import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne, 
    JoinColumn
  } from 'typeorm';
import Address from './Addresses';

@Entity('Points')
class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  number: string;

  @OneToOne(() => Address, (address: Address) => address.point, { eager: true })
  @JoinColumn()
  address: Address;

  @Column()
  address_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Point;