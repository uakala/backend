import OpenAI from "openai";
import ProductService from "./productService.js";


const productservice= new ProductService();


// Servicio GPT para interactuar con la API de OpenAI
class GPTService {
    constructor(apiKey) {
        this.openai = new OpenAI({
            apiKey: apiKey
        });
    }

    async queryGPT(messages) {
        if (!messages) {
            throw new Error("No messages provided");
        }

        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-4-turbo",
                messages: messages
            });
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error al conectar con OpenAI:', error);
            throw new Error("Failed to fetch response from OpenAI");
        }
    }

    async processImage(base64Image) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4-turbo",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Necesitaria que obtuvieses solo el nombre y precio de los platos de una carta y los muestres unicamente como un JSON, no hace falta la categoria (Unicamente devuelve el JSON, no digas nada mas que no sea solo el JSON)" },
                            {
                                type: "image_url",
                                image_url: {
                                    url: base64Image
                                },
                            },
                        ],
                    },
                ],
            });
            const result = JSON.parse(response.choices[0].message.content.replaceAll('```', '').replaceAll('json', '').replaceAll('\n', ''));
            return Promise.all(result.map(product => productservice.insertProduct(product)))
        } catch (error) {
            console.error('Error processing image with GPT-4 Turbo Vision:', error);
            throw new Error("Failed to process image with GPT-4 Turbo Vision");
        }
    }
}


export default GPTService;
