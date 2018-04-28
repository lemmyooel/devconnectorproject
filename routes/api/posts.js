const express = require('express');
const router = express.Router();


/*************** Test ROUTE *******************/
// GET request for api/posts/test
// Tests Post Route
// Public Access 
router.get('/test', (req,res) => {
    res.json({
        msg: "Posts Page"
    })
});

/*************** End of Test ROUTE *******************/


module.exports = router;