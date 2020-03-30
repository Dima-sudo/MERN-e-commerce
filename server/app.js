const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const postRoutes = require('./Routes/postsRoutes');

const DB = require('./Utility/DB_Connect');
 
DB.connect();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/posts', postRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

