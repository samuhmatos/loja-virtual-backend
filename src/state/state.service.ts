import { Injectable } from '@nestjs/common';
import { State } from './entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async getAll(): Promise<State[]> {
    return this.stateRepository.find();
  }
}
