import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentStatusService } from './payment-status.service';
import { PaymentStatus } from './entities/payment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatus])],
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
