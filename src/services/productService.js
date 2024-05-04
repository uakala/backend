import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

class ProductService {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.HOST_DB,
            user: process.env.USER_DB,
            password: process.env.PASSWORD_DB,
            database: process.env.DB
        });

        this.connection.connect(err => {
            if (err) throw err;
            console.log("Connected successfully.");
        });
    }

    async getAllProducts() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM products', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async insertProduct(product) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)';
            this.connection.query(query, [product.name, product.price, product.description, product.stock], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}


export default ProductService;
