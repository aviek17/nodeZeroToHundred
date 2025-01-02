const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL_CSA;
mongoose.connect(DB_URL);

//schemas
const AdminSchema = new mongoose.Schema({

})

const UserSchema = new mongoose.Schema({
    
})

const CourseSchema = new mongoose.Schema({
    
})


const Admin = mongoose.model('Admin', AdminSchema); 
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);



module.exports = {
    Admin,
    User,
    Course
}


