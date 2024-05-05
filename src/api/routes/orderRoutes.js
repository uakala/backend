import express from "express";

import { handlePlaceOrder, handleGetActiveOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post('/', handlePlaceOrder);
router.get('/pending', handleGetActiveOrder);

export default router;
