const express = require('express');
const page = require('./pageTest');
const router  = express.Router();

router.get('/getUrls', function (req,res){
    page.testLvpPage(req.query.url).then(function(response){
        res.send(response);
    })
});

module.exports = router;

