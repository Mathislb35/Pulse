
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private repo: Repository<Users>,
  ) {}
  async findAll(): Promise<Users[]> {
    return this.repo.find();
  }
  async findOneByEmail(email: string): Promise<Users | undefined> {
    const user = await this.repo.findOne({ where: { email } });
    return user ?? undefined;
  }
  async findOneById(id: number): Promise<Users | undefined> {
    const user = await this.repo.findOneBy({ id });
    return user ?? undefined;
  }
  async create(nom: string, email: string, passwordHash: string, phone: string): Promise<Users> {
    const user = this.repo.create({
      nom,
      email,
      password_hash: passwordHash,
      phone,
    });
    return this.repo.save(user);
  }
  async update(id: number, updateUserDto: any): Promise<void> {
    await this.repo.update(id, updateUserDto);
  }
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
