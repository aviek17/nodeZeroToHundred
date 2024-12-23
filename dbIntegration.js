const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require('dotenv').config();


const jwtPassword = "abc456";


const DB_URL = process.env.DB_URL;

const app = express();
app.use(express.json());

mongoose.connect(DB_URL);


//model
const User = require('./model/userSchema.js');



const checkUserExists = async (username, password) => {
    const USERS = await User.find().populate('username email');
    let result = USERS.filter(user => user.username === username);

    if (!result) {
        return { status: false, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, result[0].password);

    if (!isMatch) {
        return { status: false, message: "Invalid username or password" };
    }
    else {
        return { status: true, user: result[0] };
    }

}

const findAllUsers = async () => {
    try{
        const USERS = await User.find().populate('username email');
        return USERS;
    }
    catch(err){
        throw new Error(err);
    }
    
}

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const userList = await checkUserExists(username, password);

    console.log(userList);

    if (!userList.status) {
        return res.status(404).json({ message: userList.message });
    }

    if (userList) {
        jwt.sign({ username }, jwtPassword, {
            expiresIn: "2h",
        }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Error generating token" });
            }
            else {
                return res.json({
                    token,
                    username,
                    email: userList?.user?.email
                });
            }
        })
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
})

app.get("/users", async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        return res.status(200).json({
            username,
            token,
            users: await findAllUsers()
        })
    }
    catch (err) {
        return res.status(403).json({ err: "Invalid Token" })
    }
})

app.post("/add-user", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            console.log("Fields not filled")
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            console.log("User already exists")
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', username: newUser.username });
    }
    catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
})