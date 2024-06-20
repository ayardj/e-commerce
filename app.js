require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');

// Set Mongoose `strictQuery` option
mongoose.set('strictQuery', false);
// express
const express = require("express");
const app = express();

//reest of packages
const morgan = require("morgan");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const cors = require("cors");
// const rateLimiter = require("express-rate-limit");

//db
const connectDB = require("./db/connect");

//routes
const authRoutes = require('./routes/authRoutes')

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('e-commerce API');
});

app.use('/api/v1/auth', authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server listening on port ${port}...`));	
    } catch (error) {
        console.error(error);
    }    
}


start();