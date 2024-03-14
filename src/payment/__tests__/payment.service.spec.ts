import { Test, TestingModule } from '@nestjs/testing';
import { PaymentRepository, PaymentService } from '../payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import {
  createOrderCreditCardMock,
  createOrderPixMock,
} from '../../order/mocks/create-order.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { paymentMock } from '../mocks/payment.mock';
import { paymentPixMock } from '../mocks/payment-pix.mock';
import { PaymentPix } from '../entities/payment-pix.entity';
import { PaymentCreditCard } from '../entities/payment-credit-cart.entity';
import { paymentCreditCardMock } from '../mocks/payment-credit-card.mock';
import { cartProductMock } from '../../cart-product/__mocks__/cart-product.mock';
import { PaymentType } from '../enums/payment-type.enum';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: PaymentRepository;

  const finalPrice = Number(
    (productMock.price * cartProductMock.amount).toFixed(2),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useValue: { save: jest.fn().mockResolvedValue(paymentMock) },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<PaymentRepository>(
      getRepositoryToken(Payment),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });

  it('should return Payment pix on create', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.create(
      createOrderPixMock,
      [productMock],
      cartMock,
    );

    const savePayment = spy.mock.calls[0][0] as PaymentPix;

    expect(payment).toEqual(paymentMock);
    expect(savePayment.code).toEqual(paymentPixMock.code);
    expect(savePayment.datePayment).toEqual(paymentPixMock.datePayment);
  });

  it('should return Payment credit card on create', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.create(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savePayment = spy.mock.calls[0][0] as PaymentCreditCard;

    expect(payment).toEqual(paymentMock);
    expect(savePayment.amountPayments).toEqual(
      paymentCreditCardMock.amountPayments,
    );
  });

  // it('should return exception in send uncompleted data on create', async () => {
  //   expect(
  //     service.create(
  //       { addressId: createOrderCreditCardMock.addressId },
  //       [productMock],
  //       cartMock,
  //     ),
  //   ).rejects.toThrowError(BadRequestException);
  // });

  it('should return final price 0 in cartProduct undefined on create', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    await service.create(createOrderCreditCardMock, [productMock], cartMock);

    const savePayment = spy.mock.calls[0][0] as PaymentCreditCard;

    expect(savePayment.finalPrice).toEqual(0);
  });

  it('should return final price send cartProduct on create', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    await service.create(createOrderCreditCardMock, [productMock], {
      ...cartMock,
      cartProducts: [cartProductMock],
    });

    const savePayment = spy.mock.calls[0][0] as PaymentCreditCard;

    expect(savePayment.finalPrice).toEqual(finalPrice);
  });

  it('should return all data on create', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    await service.create(createOrderCreditCardMock, [productMock], {
      ...cartMock,
      cartProducts: [cartProductMock],
    });

    const savePayment = spy.mock.calls[0][0] as PaymentCreditCard;

    const paymentCreditCard = new PaymentCreditCard(
      PaymentType.Done,
      finalPrice,
      0,
      finalPrice,
      createOrderCreditCardMock,
    );

    expect(savePayment).toEqual(paymentCreditCard);
  });
});
