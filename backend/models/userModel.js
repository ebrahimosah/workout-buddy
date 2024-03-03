const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//static methods
//use normal function to access the "this" property, it dont work on arrow functions
userSchema.statics.signup = async function (email,password) {

    //validation using validator to serve as regex for me
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('weak password');
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }
    //salt is a random string of xters added to the password
    //brcypt is a hashing function, hashing is protecting the password
    //after hashing you'll get a hashed password returned which is what youll save to the database
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password:hash})

    return user;

};

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;

}


const User = mongoose.model('user', userSchema);
module.exports = User;