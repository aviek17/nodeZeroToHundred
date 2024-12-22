const express = require("express");
const jwt = require("jsonwebtoken");

const jwtPassword = "abc456";

const app = express();
app.use(express.json());


const All_USERS = [
    {
        name: "User1",
        userName: "user1@email.com",
        password: "123",
    },
    {
        name: "User2",
        userName: "user2@email.com",
        password: "123",
    },
    {
        name: "User3",
        userName: "user3@email.com",
        password: "123",
    },
    {
        name: "User4",
        userName: "user4@email.com",
        password: "123",
    }
]


const checkUserExists = (username) => {
    return All_USERS.filter(user => user.userName === username);
}

const checkUserValid = (user, username, password) => {
    return user.userName === username && user.password === password;
}


app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    const userList = checkUserExists(username);

    if (!userList || userList.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    if (checkUserValid(userList[0], username, password)) {
        jwt.sign({ username }, jwtPassword, {
            expiresIn: "1h",
        }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Error generating token" });
            }
            else {
                return res.json({
                    token,
                    username,
                    name: userList[0].name
                });
            }
        })
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
})


app.get("/users-list", (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        return res.status(200).json({
            username,
            token,
            users : All_USERS
        })
    }
    catch (err) {
        return res.status(403).json({ err: "Invalid Token" })
    }
})


app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
})