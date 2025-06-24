import { Request, Response, NextFunction } from 'express';
import { Database } from '../config/db';
import { User } from '../models/user.model';

const userRepo = Database.getRepository(User);

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateResult = await userRepo.update(req.params.id, req.body);
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await userRepo.findOneBy({ id: parseInt(req.params.id) });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteResult = await userRepo.delete(req.params.id);
    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
