import { Test, TestingModule } from '@nestjs/testing';
import {
  PaymentStatusRepository,
  PaymentStatusService,
} from '../payment-status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentStatus } from '../entities/payment-status.entity';

describe('PaymentStatusService', () => {
  let service: PaymentStatusService;
  let paymentStatusRepository: PaymentStatusRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentStatusService,
        { provide: getRepositoryToken(PaymentStatus), useValue: {} },
      ],
    }).compile();

    service = module.get<PaymentStatusService>(PaymentStatusService);
    paymentStatusRepository = module.get<PaymentStatusRepository>(
      getRepositoryToken(PaymentStatus),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentStatusRepository).toBeDefined();
  });
});
