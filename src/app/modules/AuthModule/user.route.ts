import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId/orders', UserController.addNewOrder);
router.get('/:userId/orders', UserController.getAllOrdersOfSingleUser);
router.get('/:userId/orders/total-price', UserController.getTotalPriceOfOrders);

export const UserRoutes = router;
