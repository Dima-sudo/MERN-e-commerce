const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const fileUpload = require('express-fileupload');

// Enables CORS requests
const cors = require('cors');

const miscRoutes = require('./Routes/miscRoutes');
const postRoutes = require('./Routes/postsRoutes');
const authRoutes = require('./Routes/authRoutes');
const productRoutes = require('./Routes/productRoutes');
const laptopRoutes = require('./Routes/laptopRoutes');
const televisionRoutes = require('./Routes/televisionRoutes');
const phoneRoutes = require('./Routes/phoneRoutes');
const headphoneRoutes = require('./Routes/headphoneRoutes');
const otherRoutes = require('./Routes/otherRoutes');
const commentRoutes = require('./Routes/commentRoutes');

const PORT = process.env.PORT || 8080;

const DB = require('./Utility/DB_Connect');



DB.connect();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Files are saved to the cloud on not to the server so this is used instead of multer/formidable
app.use(fileUpload({
    useTempFiles: true
}));

// Routes
app.use('/misc', miscRoutes);
app.use('/products/comments', commentRoutes);
app.use('/products/Headphones', headphoneRoutes);
app.use('/products/phones', phoneRoutes);
app.use('/products/televisions', televisionRoutes);
app.use('/products/laptops', laptopRoutes);
app.use('/products/others', otherRoutes);
app.use('/products', productRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);



// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    // Set a static folder
    app.use(express.static(path.resolve(__dirname, '../', 'client', 'dist')))
}



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'));
    })
});

