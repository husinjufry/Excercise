import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).json({ message: "Verify Token Success. " })
    console.log('Verify Value: '+ decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};