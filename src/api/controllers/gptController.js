import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import GPTService from "../../services/gptService.js";
import dotenv from "dotenv";

dotenv.config();

const gptService = new GPTService(process.env.OPENAI_API_KEY);

// Configuración para obtener __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de almacenamiento en memoria para Multer
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

async function handleChatRequest(req, res) {
    try {
        const messages = req.body.messages;

        if (!messages) {
            return res.status(400).json({error: "No messages to send"});
        }

        const response = await gptService.queryGPT(messages);
        res.json(response);
    } catch (error) {
        console.error('Failed to process chat request: ', error);
        res.status(500).json({error: error.message});
    }
}

async function handleImageUpload(req, res) {
    const base64Image = req.body.image;
    if (!base64Image) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const products = await gptService.processImage(base64Image);
        res.json({ message: 'Image uploaded and analyzed successfully', description: products });
    } catch (error) {
        console.error('Failed to analyze base64Image: ', error);
        res.status(500).json({error: error.message});
    }
}

export { handleChatRequest, handleImageUpload, upload };

