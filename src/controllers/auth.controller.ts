import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Database } from '../config/db';
import { User } from '../models/user.model';

const userRepo = Database.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepo.create({ name, email, password: hashedPassword });
  await userRepo.save(user);
  res.status(201).json({ message: 'User registered' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userRepo.findOneBy({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token });
};