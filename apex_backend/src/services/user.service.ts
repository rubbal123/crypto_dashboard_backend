import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';

export class UserService {
  private userRepository = new UserRepository();

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email); // You need to implement this method in the repository
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return await this.userRepository.create(userData);
  }
  async signup(userData: Partial<User>): Promise<User> {
    console.log(userData,"Data")
    const existingUser = await this.getUserByEmail(userData.email!);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    return await this.createUser(userData);
  }
}
