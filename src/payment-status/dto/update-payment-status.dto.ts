import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentStatusDto } from './create-payment-status.dto';

export class UpdatePaymentStatusDto extends PartialType(CreatePaymentStatusDto) {}
