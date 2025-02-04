const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL_CSA;
mongoose.connect(DB_URL);

//schemas
const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, { timestamps: true })

const CourseSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    imageLink : {
        type: String
    },
    price : {
        type: Number,
        required: true
    },
    isPublished : {
        type : Boolean,
        required : true,
        default : false
    }
})


const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);



module.exports = {
    Admin,
    User,
    Course
}


