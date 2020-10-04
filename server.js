const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the user model" }));

//define routes with app.use

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/appointments", require("./routes/appointments"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
