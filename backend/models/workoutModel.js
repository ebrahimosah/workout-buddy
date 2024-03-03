const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type: Number,
        validate:{
            validator: (value)=> {
                return value>0;
            },
            message:'please enter a valid number'
        }
    },
    load:{
        type: Number,
        validate:{
            validator: (value)=> {
                return value>0;
            },
            message:'please enter a valid number'
        }
    },
    user_id:{
        type: String,
        required: true,
    }
},{timestamps: true})

const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;