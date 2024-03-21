const express=require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/connectionDb');
const dotenv=require('dotenv').config();

const port=process.env.PORT || 5000;
connectDb();
const app=express();
app.use(express.json());
app.use('/api/user',require('./routers/userRoutes'));
app.use('/api/contacts',require('./routers/contactRoutes'));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
});