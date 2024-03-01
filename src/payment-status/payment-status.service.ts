import { Injectable } from '@nestjs/common';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatus } from './entities/payment-status.entity';
import { Repository } from 'typeorm';

export type PaymentStatusRepository = Repository<PaymentStatus>;
@Injectable()
export class PaymentStatusService {
  constructor(
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusRepository: PaymentStatusRepository,
  ) {}

  create(createPaymentStatusDto: CreatePaymentStatusDto) {
    return 'This action adds a new paymentStatus';
  }

  findAll() {
    return `This action returns all paymentStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentStatus`;
  }

  update(id: number, updatePaymentStatusDto: UpdatePaymentStatusDto) {
    return `This action updates a #${id} paymentStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentStatus`;
  }
}
