const express = require('express');
const staticRoutes = require('./routes/staticRoute')
const route = require('./routes/user')
const { connectToMongoDB } = require('./mongo_connect')

const path = require('path');

const app = express()
const port = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

connectToMongoDB("mongodb://localhost:27017/login_users")

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/user", route)
app.use("/", staticRoutes)


app.listen(port, ()=> console.log(`Server Started at PORT: ${port}`))
