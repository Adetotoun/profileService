const express = require('express');
const app = express();
const db = require('./src/config/db');
const profileRouter = require('./src/routes/profile.routes');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin: "*"}));

app.use('/api', profileRouter);

app.get('/',(req,res)=>{
    res.send("Hello!");
});

db();

app.listen(port,()=>{
    console.log(`Server listening on localhost: ${port}`);
});
