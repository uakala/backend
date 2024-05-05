import OrderService from "../../services/orderService.js";
import ProductService from "../../services/productService.js";

const orderService = new OrderService();
const productService = new ProductService();

async function handlePlaceOrder(req, res) {
    try {
        let products = [];
        const customerId = req.body.customerId;
        const productsIds = req.body.products;
        for (const product of productsIds) {
            let result = await productService.getProductById(product);
            if (!result) {
                return res.status(404).json({error: `Product with id ${product} not found`});
            }
            products.push(result[0]);
        }
        const total = products.reduce((acc, product) => acc + product.price, 0);
        let result = await orderService.handlePlaceOrder(customerId, products, total);
        res.json({message: 'Order placed successfully', order: result});
    } catch (error) {
        console.error('Failed to place order: ', error);
        res.status(500).json({error: error.message});
    }
}

async function handleGetActiveOrder(req, res) {
    try {
        const phone = req.query.phone.trim();
        let result = await orderService.getActiveOrderByPhone('+' + phone);
        res.json(result);
    } catch (error) {
        console.error('Failed to get active order: ', error);
        res.status(500).json({error: error.message});
    }
}

export { handlePlaceOrder, handleGetActiveOrder };
