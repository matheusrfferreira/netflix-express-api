import { Repository } from "typeorm";
import bcrypt from "bcrypt";

import { User } from "@entities";
import { AppDataSource } from "@data-source";
import { CreateUserDTO } from "@dto";
import { CRUD } from "@interfaces";
import { ProfileService } from "@services";

class UserService implements CRUD {
  userRepository: Repository<User>;
  constructor () {
    this.userRepository = AppDataSource.getRepository(User);
  };

  async create (createUserDTO: CreateUserDTO) {
    const profileService = new ProfileService();
    const { email, password } = createUserDTO;
    const SALTS = 10;
    const newUserPayload = {
      email,
      password: await bcrypt.hash(password, SALTS),
    };
    const savedUser = await this.userRepository.save(newUserPayload);
    await profileService.create(savedUser);
    return savedUser;
  };

  async getUserByEmail (email: string) {
    const foundUser = await this.userRepository.findOne({ where: { email } });
    return foundUser;
  };

  async findAll (): Promise<any> {
    return await this.userRepository.find();
  };

  async findOne (id: any): Promise<any> {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    return foundUser;
  };

  async update (id: any, resource: any): Promise<any> {

  };

  async delete (id: any): Promise<any> {

  };
};

export default UserService;
