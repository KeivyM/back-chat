import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user)
    return { user };
  }

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  async findOne(id: string) {
    const user = this.userRepository.findOne({where:{id}});
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      if (!user) throw 'this user not exist';
      await this.userRepository.update(id, { ...updateUserDto });
      return await this.userRepository.findOne({ where: { id } })  
    } catch (error) {
      console.log(error)
      return {
        error
      }
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } })

      if (!user) throw 'this user not exist';
      this.userRepository.remove(user)  
    } catch (error) {
      console.log(error)
      return {
        error
      }
    }
  }
}
