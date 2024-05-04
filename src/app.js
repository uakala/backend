import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import serverless from 'serverless-http'; // Import serverless-http

import gptRoutes from './api/routes/gptRoutes.js';

dotenv.config();

const app = express();

// Disable CORS globally
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// increment max size of request body
app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/gpt', gptRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})

export const handler = serverless(app); // Export handler instead of app.listen()

