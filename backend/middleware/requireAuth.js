const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    //verify authentication

    const {authorization} = req.headers;

    if (!authorization){
        return res.status(401).json({error:'authorization token is required'})
    }

    // authorization format string("bearer token")
    const token = authorization.split(' ')[1];

    try{
        //verify the token
        const {_id} = jwt.verify(token,process.env.SECRET)
        
        req.user = await User.findOne({_id}).select('_id')

        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'request is not authorized'})
    }

}

module.exports = requireAuth;