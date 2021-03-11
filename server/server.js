const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

const apiRouter = require("./routes/api");

mongoose.connect(
    process.env.MONGODB_URI ||
        "mongodb+srv://bostonlobstergang:climbpg0326@cluster0.plwnl.mongodb.net/cluster0?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use("/api", apiRouter);

// test
//d test
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
