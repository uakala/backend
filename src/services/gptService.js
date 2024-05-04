import OpenAI from "openai";

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

    async analyzeImage(base64Image) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4-turbo",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "What’s in this image?" },
                            {
                                type: "image_url",
                                image_url: {
                                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
                                },
                            },
                        ],
                    },
                ],
            });
            console.log(response);
        } catch (error) {
            console.error('Error processing image with GPT-4 Turbo Vision:', error);
            throw new Error("Failed to process image with GPT-4 Turbo Vision", error);
        }
    }
}


export default GPTService;
