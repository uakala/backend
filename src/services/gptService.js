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
            console.log(response.choices[0].message.content)
            const exemple = [
            {
                "Chips & Salsa": "1.75",
                "Guacamole": "3.95",
                "Cheese Quesadillas": "5.75",
                "Chicken or Steak Quesadillas": "6.75",
                "Queso Fundido": "6.25",
                "Chile con Queso": "6.75",
                "Nachos Supreme": "6.95",
                "Carne Asada Burrito": "7.25",
                "Chicken Burrito": "6.25",
                "Picadillo Burrito": "6.75",
                "Burrito al Pastor": "6.75",
                "Vegetarian Burrito": "5.75",
                "Carne Asada Taco": "7.25",
                "Chicken Taco": "6.25",
                "Picadillo Taco": "6.75",
                "Chorizo Taco": "5.75",
                "Tacos al Pastor": "6.75",
                "Tilapia Taco": "6.75",
                "Vegetarian Taco": "5.75",
                "Enchilada Roja": "8.75",
                "Enchilada Verde": "8.75"


        }]
            //const jsonObjects = JSON.parse(response.choices[0].message.content);
            return Promise.all(exemple.map(product => productservice.insertProduct(product)))
        } catch (error) {
            console.error('Error processing image with GPT-4 Turbo Vision:', error);
            throw new Error("Failed to process image with GPT-4 Turbo Vision");
        }
    }
}


export default GPTService;
