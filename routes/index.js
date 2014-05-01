var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

////mongoose
//mongoose.connect("mongodb://localhost/crud");

//creating the schema for mongo
var UserSchema = new mongoose.Schema({
        title: String,
        name: String,
        date: String,
        content: String,
        replies: String,
        views: String,
        message: String,
        messagedate: String
    }),
//Users will be used to do or  CRUD
    Users = mongoose.model('Users', UserSchema);

///* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});

// route to show all our users
router.get("/", function(req,res){
    Users.find({}, function(err, docs){
        res.render('users/index', { users: docs });
    });
});


//form page for new users
router.get("/users/new", function(req,res) {
    res.render('users/new');
});

router.get("/users/reply", function(req,res) {
    res.render('users/reply');
});

//this is going to be our create route
router.post('/users', function(req,res){
    var b = req.body;
    new Users({
        title: b.title,
        name: b.name,
        date: b.date,
        replies: b.replies,
        content: b.content,
        views: b.views,
        message: b.message,
        messagedate: b.messagedate
    }).save(function (err, user){
            if(err) res.json(err);
            res.redirect('/users/' + user.name);
        });
})

//get our params from documents
router.param('name', function(req, res, next, name){
    //find the name that matches and shows the first one
    Users.find({ name: name }, function(err, docs){
        req.user = docs[0];
        next();
    });
});

//users page show
router.get('/users/:name', function(req, res){
    res.render("users/show", { user: req.user});
});

//edit users
router.get('/users/:name/edit', function(req, res){
    res.render("users/edit", { user: req.user });
});

//handle updates
router.post('/users/:name', function(req, res){
    var b = req.body;
    Users.update(
        { name: req.params.name },
        { title: b.title, name: b.name, date: b.date, content: b.content, replies: b.replies, views: b.views, message: b.message, messagedate: b.messagedate},
        function(err){
            res.redirect("/users/" + b.name);
        }
    );
});



module.exports = router;
