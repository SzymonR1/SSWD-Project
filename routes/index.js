const { Router } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Usage' });
});

// help page

router.route('/help')
.get((req,res,next) => {
    res.render('help', { title: 'Help' });
})

// about page

router.route('/about')
.get((req,res,next) => {
    res.render('about', { title: 'About' });
})

module.exports = router;