import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Address from './Addresses';

@Entity('points')
class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Address, (address: Address) => address.point, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  address_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Point;
