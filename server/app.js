const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const fileUpload = require('express-fileupload');

const cors = require('cors');

const postRoutes = require('./Routes/postsRoutes');
const authRoutes = require('./Routes/authRoutes');
const productRoutes = require('./Routes/productRoutes');
const laptopRoutes = require('./Routes/laptopRoutes');
const televisionRoutes = require('./Routes/televisionRoutes');
const commentRoutes = require('./Routes/commentRoutes');

const DB = require('./Utility/DB_Connect');


DB.connect();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Files are saved to the cloud on not to the server so this is used instead of multer/formidable
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/products/comments', commentRoutes);
app.use('/products/televisions', televisionRoutes);
app.use('/products/laptops', laptopRoutes);
app.use('/products', productRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);





app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

