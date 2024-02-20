import { Injectable } from '@nestjs/common';
import { State } from './entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type StateRepository = Repository<State>;
@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: StateRepository,
  ) {}

  async getAll(): Promise<State[]> {
    return this.stateRepository.find();
  }
}
