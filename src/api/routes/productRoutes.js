import express from "express";
import { handleFindProducts } from "../controllers/productsController.js";

const router = express.Router();

router.get('/', handleFindProducts);

export default router;
