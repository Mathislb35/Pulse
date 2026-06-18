import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commune } from './entities/commune.entity';

@Injectable()
export class CommunesService {
  constructor(
    @InjectRepository(Commune)
    private readonly communeRepository: Repository<Commune>,
  ) {}

  async findAll(): Promise<Commune[]> {
    return this.communeRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Commune | null> {
    return this.communeRepository.findOne({
      where: { id_commune: id },
    });
  }
}
