import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from '../models/transaction'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @OneToMany(() => Transaction, t => t.account)
  transactions: Transaction[];

  constructor(id: number, userId: number, balance: number, transactions: Transaction[]) {
    this.id = id;
    this.userId = userId;
    this.balance = balance;
    this.transactions = transactions;
  }
}
