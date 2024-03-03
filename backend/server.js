require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoute')
const userRoutes = require('./routes/userRoute')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.json({page: 'index'});
})

app.use('/api/user', userRoutes);

app.use('/api/workouts', workoutRoutes);




mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`listening on ${process.env.PORT} and connected to the db`);
    })
})
.catch(err=>console.log(err));
