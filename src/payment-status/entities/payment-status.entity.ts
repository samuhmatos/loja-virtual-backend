import { Payment } from '../../payment/entities/payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment_status' })
export class PaymentStatus {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'active', nullable: false })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.paymentStatus)
  payments?: Payment[];
}
