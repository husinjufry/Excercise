import { Request, Response } from 'express';
import { Database } from '../config/db';
import { User } from '../models/user.model';

const userRepo = Database.getRepository(User);

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepo.find();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  await userRepo.update(req.params.id, req.body);
  const updatedUser = await userRepo.findOneBy({ id: parseInt(req.params.id) });
  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userRepo.delete(req.params.id);
  res.json({ message: 'User deleted' });
};