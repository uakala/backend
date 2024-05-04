import express from "express";

import { handlePlaceOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post('/', handlePlaceOrder);

export default router;
