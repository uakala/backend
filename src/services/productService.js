import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

class ProductService {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'uakala-prod.cxy6yg0i4dno.us-east-1.rds.amazonaws.com',
            user: 'uakala',
            password: 'uakala2024',
            database: 'uakala'
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
            const query = 'INSERT INTO products (productname, price) VALUES (?, ?)';
            this.connection.query(query, [product.name, product.price], (err, result) => {
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
