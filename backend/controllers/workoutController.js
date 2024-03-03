const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all the workouts
const workout_get_all = async (req, res, next) =>{
    const user_id = req.user._id;
    try{
        const workouts = await Workout.find({user_id}).sort({createdAt:-1})
        res.status(200).json(workouts)
    } catch(err){
        res.status(500).json({error:'internal server error'});
    }
}

//get a single workout

const workout_get_one = async (req, res, next) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({error: 'Not Found'})
    }
    res.status(200).json(workout);
}



//create new Workout
const workout_create = async (req, res, next) => {
    const {title, reps, load } = req.body;

    const emptyFields = [];
    if (!title){
        emptyFields.push('title');
    }
    if(!reps || reps<=0){
        emptyFields.push('reps'); 
    }
    if(!load || load<=0){
        emptyFields.push('load');
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try{
        //grabbin the user_id(foreign key) from the req body 
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id});
        res.status(200).json(workout);
    } catch(err){
        res.status(402).json({error: err.message});
    }
};


//delete a workout
const workout_delete = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        return res.status(404).json({error: 'Not Found'})
    }
    res.status(200).json(workout);
}

//update workout

const workout_update = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    });
    if(!workout){
        return res.status(404).json({error: 'Not Found'})
    }
    res.status(200).json(workout);
}





module.exports = {
    workout_get_all,
    workout_get_one,
    workout_create,
    workout_delete,
    workout_update
}