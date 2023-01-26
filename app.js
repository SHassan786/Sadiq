const express = require('express');
const app = express();
const dotenv = require('dotenv');
const liveRouter = require('./components/liveStream/routes')

dotenv.config({path: './config.env'});


app.use("/liveStream", liveRouter);

// const port = process.env.PORT;
app.listen(4000, () =>{
    console.log('App is working')
});


