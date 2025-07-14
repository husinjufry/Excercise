import { Router } from 'express';
import { getBalance, deposit, withdraw, transfer } from '../controllers/atm.controller';
import { authenticate } from '../middlewares/auth';


const router = Router();

router.use(authenticate);
router.get('/balance', getBalance);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.post('/transfer', transfer);


export default router;
