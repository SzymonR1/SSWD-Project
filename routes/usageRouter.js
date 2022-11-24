const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usages = require('../models/usage');

const usageRouter = express.Router();

usageRouter.route('/')
.get((req,res,next) => {
})
.post((req, res, next) => {
})
.put((req, res, next) => {
})
.delete((req, res, next) => {
});


usageRouter.route('/create')
.get((req,res,next) => {
    res.render('newusage.ejs', { title: 'Add Usage' });   
})

.post((req, res, next) => {
    usages.create(req.body)
    .then((usagecreated) => {
        console.log('Usage Created ', usagecreated);
        usages.find()
         .then((usagesfound) => {
                res.render('currentusage',{'usagelist' : usagesfound, title:'All Usages'} );
        }, (err) => next(err))
    .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

// view all usages
usageRouter.route('/all')
.get((req,res,next) => {
    usages.find()
    .then((usagesfound) => {
        res.render('currentusage',{'usagelist' : usagesfound, title:'All Usages'} );
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /usages/create');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not supported on /usages/create');
});

// delete usage entry
usageRouter.route('/delete/:id')
.get((req,res,next) => {
    usages.findByIdAndRemove(req.params.id)
    .then((usagedeleted) => {
        usages.find()
        .then((usagesfound) => {
            res.render('currentusage',{'usagelist' : usagesfound, title:'All Usages'} );
        }, (err) => next(err))
        .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

// edit usage entry
// this works by first finding the usage entry by id, then rendering the edit page
usageRouter.route('/edit/:id')
.get((req,res,next) => {
    usages.findById(req.params.id)
    .then((usagesfound) => {
        res.render('editusage',{'usagelist' : usagesfound, title:'Edit Usage'} );
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
    usages.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((usageupdated) => {
        usages.find()
        .then((usagesfound) =>
        {
            res.render('currentusage',{'usagelist' : usagesfound, title:'Edit Usage'} );
        }, (err) => next(err))
        .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

// search between fromDate and toDate for searchName
usageRouter.route('/search')
.get((req,res,next) => {
    res.render('searchusage.ejs', { title: 'Search Usage' });
})
// if toDate is empty then search a user from fromDate to today
// if fromDate is empty then search a user from the beginning to toDate
// if both fromDate and toDate are empty then search a user from the beginning to today
// if no searchName then search all users
.post((req, res, next) => {
    var fromDate = req.body.fromDate;
    var toDate = req.body.toDate;
    var searchName = req.body.searchName;
    var searchQuery = {};
    if (fromDate != '' && toDate != '') {
        searchQuery = { $and: [ { date: { $gte: fromDate } }, { date: { $lte: toDate } } ] };
    } else if (fromDate != '' && toDate == '') {
        searchQuery = { date: { $gte: fromDate } };
    } else if (fromDate == '' && toDate != '') {
        searchQuery = { date: { $lte: toDate } };
    }
    if (searchName != '') {
        searchQuery = { $and: [ searchQuery, { name: searchName } ] };
    }
    usages.find(searchQuery)
    .then((usagesfound) => {
        res.render('currentusage',{'usagelist' : usagesfound, title:'All Usages'} );
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = usageRouter;