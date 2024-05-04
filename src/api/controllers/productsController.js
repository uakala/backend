import ProductService from "../../services/productService.js";

const productService = new ProductService();

async function handleFindProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Failed to get products: ', error);
        res.status(500).json({error: error.message});
    }
}

export { handleFindProducts };
