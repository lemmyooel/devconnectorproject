const express = require('express');
const router = express.Router();



// GET request for api/users/test
// Tests Post Route
// Public Access 
router.get('/test', (req,res) => {
    res.json({
        msg: "Users Page"
    })
});


module.exports = router;