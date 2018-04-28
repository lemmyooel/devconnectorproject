const express = require('express');
const router = express.Router();



// GET request for api/profile/test
// Tests Profile Route
// Public Access 
router.get('/test', (req,res) => {
    res.json({
        msg: "Profile Page"
    })
});


module.exports = router;