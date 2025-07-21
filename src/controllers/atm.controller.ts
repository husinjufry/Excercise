import { Request, Response, NextFunction } from 'express';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';
import { Database } from '../config/db';
import { User } from '../models/user.model';

const accountRepo = Database.getRepository(Account);
const transactionRepo = Database.getRepository(Transaction);
const userRepo = Database.getRepository(User);

export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id;
  
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const account = await accountRepo.findOneBy({ userId });
  
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      const result = res.json({ balance: account.balance });
        return result;
    } catch (err) {
      return next(err);
    }
};
  
  

export const deposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
  
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    const { amount } = req.body;
 
    const account = await accountRepo.findOneBy({ userId });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.balance = parseFloat(account.balance as any) + parseFloat(amount);
    await accountRepo.save(account);

    const transaction = transactionRepo.create({ type: 'deposit', amount, account });
    await transactionRepo.save(transaction);

    
    res.json({ message: 'Deposit successful', balance: account.balance });
  } catch (err) {
    next(err);
  }
};

export const withdraw = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id;
  
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { amount } = req.body;
      const numericAmount = parseFloat(amount);
  
      if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ message: 'Invalid withdrawal amount' });
      }
  
      const account = await accountRepo.findOneBy({ userId });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      const currentBalance = parseFloat(account.balance as any);
  
      if (numericAmount > currentBalance) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      account.balance = currentBalance - numericAmount;
      await accountRepo.save(account);
  
      const transaction = transactionRepo.create({ type: 'withdrawal', amount: numericAmount, account });
      await transactionRepo.save(transaction);
  
      res.json({ message: 'Withdrawal successful', balance: account.balance });
    } catch (err) {
      next(err);
    }
  };

  export const transfer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id;
      const { targetAccountId, amount } = req.body;
      const numericAmount = parseFloat(amount);
  
      if (!targetAccountId || isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ message: 'Invalid transfer data' });
      }
  
      const senderAccount = await accountRepo.findOneBy({ userId });
      if (!senderAccount) {
        return res.status(404).json({ message: 'Sender account not found' });
      }

      if (senderAccount.id === targetAccountId) {
        return res.status(400).json({ message: 'Cannot transfer to your own account' });
      }
  
      const senderBalance = parseFloat(senderAccount.balance as any);
      if (numericAmount > senderBalance) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      const recipientAccount = await accountRepo.findOneBy({ id: targetAccountId });
      if (!recipientAccount) {
        return res.status(404).json({ message: 'Recipient account not found' });
      }
  
      senderAccount.balance = senderBalance - numericAmount;
      recipientAccount.balance = parseFloat(recipientAccount.balance as any) + numericAmount;
      console.log('recipient account balance: ' + JSON.stringify(recipientAccount.balance));
      
      await accountRepo.save(senderAccount);
      await accountRepo.save(recipientAccount);
  
      const transaction = transactionRepo.create({
        type: 'transfer',
        amount: numericAmount,
        account: senderAccount,
      });
      await transactionRepo.save(transaction);
  
      res.json({ message: 'Transfer successful', balance: senderAccount.balance });
    } catch (err) {
      next(err);
    }
  };
  
  
  
