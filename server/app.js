const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const postRoutes = require('./Routes/postsRoutes');
const authRoutes = require('./Routes/authRoutes');
const productRoutes = require('./Routes/productRoutes');
const laptopRoutes = require('./Routes/laptopRoutes');

const DB = require('./Utility/DB_Connect');
//

DB.connect();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/products/laptops', laptopRoutes);
app.use('/products', productRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);





app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

