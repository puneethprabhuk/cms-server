import express from 'express';
import { 
    getClients, 
    addClient, 
    updateClient, 
    deleteClient, 
    getClient, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction, 
    getTransaction, 
} from '../controllers/client.js'
import auth from '../middleware/auth.js';



const clientRouter = express.Router();

clientRouter.get('/transactions', auth, getTransaction);

clientRouter.get('/:id', auth, getClient);

clientRouter.post('/', auth, addClient);

clientRouter.patch('/:id', auth, updateClient);

clientRouter.delete('/:id', auth, deleteClient);

clientRouter.patch('/transaction/:id', auth, addTransaction);

clientRouter.patch('/transactionUpdate/:id', auth, updateTransaction);

clientRouter.patch('/transactionDelete/:id', auth, deleteTransaction);

clientRouter.get('/', auth, getClients);

export default clientRouter;
