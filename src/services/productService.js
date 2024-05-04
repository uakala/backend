import mysql from "mysql";


class ProductService {
 constructor() {
  this.connection = mysql.createConnection({
   host     : host,
   user     : user,
   password : password,
   database : database
  });

  this.connection.connect(err =>{
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
}

export default ProductService;
