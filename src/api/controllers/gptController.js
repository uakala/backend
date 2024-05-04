import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import GPTService from "../../services/gptService.js";
import dotenv from "dotenv";
import fs from 'fs';
import * as path from "node:path";

dotenv.config();

const gptService = new GPTService(process.env.OPENAI_API_KEY);

// Configuración para obtener __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = join(__dirname, '../../../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

async function handleChatRequest(req, res) {
    try {
        const messages = req.body.message;

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
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const image = fs.readFileSync(req.file.path);
    const base64Image = Buffer.from(image).toString('base64');

    try {
        const description = await gptService.analyzeImage(base64Image);
        res.json({ message: 'Image uploaded and analyzed successfully', description });
    } catch (error) {
        console.error('Failed to analyze image: ', error);
        res.status(500).json({error: error.message});
    }
}

export { handleChatRequest, handleImageUpload, upload };

