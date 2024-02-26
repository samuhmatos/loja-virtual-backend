import { IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;
}
