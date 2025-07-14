import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../models/account';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'deposit' | 'withdrawal' | 'transfer';

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Account, acc => acc.transactions)
  account: Account;

  @Column({ nullable: true })
  targetAccountId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  constructor(id: number, amount: number, type: any, account: Account, targetAccountId: number, timestamp: Date) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.account = account;
    this.targetAccountId = targetAccountId;
    this.timestamp = timestamp;
  }
}
