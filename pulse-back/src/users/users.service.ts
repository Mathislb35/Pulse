import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

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

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const existingUserByEmail = await this.findOneByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    const existingUserByUsername = await this.repo.findOne({ where: { username: createUserDto.username } });
    if (existingUserByUsername) {
      throw new ConflictException('Ce nom d\'utilisateur est déjà utilisé.');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.repo.create({
      nom: createUserDto.nom,
      prenom: createUserDto.prenom,
      username: createUserDto.username,
      email: createUserDto.email,
      password_hash: passwordHash,
      phone: createUserDto.phone,
      date_de_naissance: createUserDto.date_de_naissance ? new Date(createUserDto.date_de_naissance) : undefined,
    });

    return this.repo.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.repo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
