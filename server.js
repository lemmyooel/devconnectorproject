const express =  require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//DATABASE CONNECTION
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log(err));

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));



//index routes
app.get('/', (req,res) => {
    res.send('Hello World');
});


//Middleware for ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);