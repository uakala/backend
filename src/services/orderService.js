import mysql from 'mysql';

class OrderService {
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

    async getActiveOrderByPhone(phone) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM customers WHERE phone = ?", [phone], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const customerId = results[0].customerid;
                    this.connection.query("SELECT * FROM orders WHERE customerId = ? AND status = 'PENDING'", [customerId], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }

    async handlePlaceOrder(customerId, products, total) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO orders (customerId, orderDate, status, total) VALUES (?, NOW(), 'PENDING', ?)";
            this.connection.query(query, [customerId, total], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }).then((result) => {
            const orderId = result.insertId;
            const orderProducts = products.map(product => [orderId, product.productid]);
            for (const order of orderProducts) {
                const query = "INSERT INTO orderdetails (orderid, productid, quantity) VALUES (?, ?, 1)";
                this.connection.query(query, order, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        return result;
                    }
                });
            }
            return orderProducts;
        });
    }
}

export default OrderService;
