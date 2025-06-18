import { User } from "../models/user.model";

export class UserFactory {
  static create(id: number, name: string, email: string, password: string): User {
    return new User(id, name, email, password);
  }
}