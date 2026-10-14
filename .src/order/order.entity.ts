import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  orderDate!: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount!: number;

  @Column()
  status!: string; // 'Pending', 'Paid', 'Shipped', 'Cancelled'

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
