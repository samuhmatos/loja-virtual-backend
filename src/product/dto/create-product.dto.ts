import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;
}
