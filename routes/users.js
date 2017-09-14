var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('../models/user');


var userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
.get(function (req, res, next) {
    
    Users.find({},function(err, users) { 
        if (err) throw err;
        res.json(users); 
    });
})

.post(function (req, res, next) {
    Users.create(req.body, function (err, user) {
        if (err) throw(err);
        console.log('User created!');
        var id = user._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the user with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Users.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

userRouter.route('/:email')
.get( function (req, res, next) {
    Users.findOne({email:req.params.email},function (err, user) {
        if (err) next(err);
            res.json(user);
        });
})

.put(function (req, res, next) {
    Users.findByIdAndUpdate(req.params.email, {
        $set: req.body
    }, {
        new: true
    }, function (err, user) {
        if (err) next(err);
        res.json(user);
    });
})

.delete(function (req, res, next) {
        Users.findByIdAndRemove(req.params.userId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=userRouter;