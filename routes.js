const express = require('express');
const page = require('./pageTest');
const router  = express.Router();

router.get('/getUrls', function (req,res){
    page.testPageUrls(req.query.url).then(function(response){
        res.send(response);
    })
});

router.get('/getPerformanceMap', function (req,res){
    page.checkResourcePerformance(req.query.url).then(function(response){
        res.send(response);
    })
});

module.exports = router;

