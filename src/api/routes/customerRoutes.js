import express from "express";
import {handleCreateCustomer} from "../controllers/customerController.js";

const router = express.Router();

router.post('/', handleCreateCustomer);

export default router;
