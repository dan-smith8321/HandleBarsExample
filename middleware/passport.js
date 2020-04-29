//file to handle the information coming in from the sign in form
const LocalStrategy = require('passport-local').Strategy; //required libraries/packages
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
//once request hits it queries the database and looks for the user and if there's no user give an error code
module.exports = (passport =>{
    passport.use( 
        new LocalStrategy((username, password, done) => {
            User.findOne({ username })
               .then(user => {
                   if (!user) {
                   return done(null, false, { message: 'Incorrect Username' });
                 }
                 bcrypt.compare(password, user.password, (err, isMatch) =>{ // using bcrpyt it's checking if the passwords match
                     if(err) throw err;
                     if(isMatch){
                         return done(null, user);
                     } else {
                         return done(null, false, { message: 'Incorrect Password' });
                     }
                 })
            })
        })
    );
    // create a session entry for the user
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    //if logged out it reduces permissions
    passport.deserializeUser((id, done)=>{
        User.findbyId(id, (err, user) =>{
            done(err, user);
        })
})
})
