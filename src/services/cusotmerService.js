import mysql from "mysql";

class CustomerService {
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

    async createCustomer(customer) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)";
            this.connection.query(query, [customer.name, customer.phone, customer.address], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default CustomerService;
