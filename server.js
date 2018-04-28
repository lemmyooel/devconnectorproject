const express =  require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');

//Initialize Express
const app = express();

/*************** Passport Middleware *******************/
app.use(passport.initialize());

//Load passport config
require('./config/passport')(passport);
/***************  Passport Middleware *******************/




/*************** Body Parser Middleware *******************/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
/*************** End of Body Parser Middleware *******************/



//DATABASE CONNECTION
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log(err));


//PORT instantiation for local and MongoDB
const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));




//Middleware for ROUTES
app.use('/api/users', users); // connectst to the user routes
app.use('/api/profile', profile);
app.use('/api/posts', posts);


