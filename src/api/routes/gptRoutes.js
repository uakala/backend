import express from 'express';
import {handleChatRequest, handleImageUpload, upload} from "../controllers/gptController.js";

const router = express.Router();

router.post('/chat', handleChatRequest);
router.post('/upload-image', handleImageUpload);

export default router;
