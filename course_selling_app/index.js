const express = require("express");
require('dotenv').config();


//const data
const PORT = process.env.BACKEND_PORT;



//routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");


//middlewares
const app = express();
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})
