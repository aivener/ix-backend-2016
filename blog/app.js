var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var PORT = 3001;

var sequelize = new Sequelize('blog', 'postgres', null, {
  host: "localhost", //your server
  port: 5432, //server port
  dialect: 'postgres' 
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
  
  
// define user model
var User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  }
});

// define post model
var Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  },
  body: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    }
  }
});

// TODO define the comments model
// a comment should have relationships to a user and a post
// the only contents in a comment are a text field "body"

Post.belongsTo(User); // tell sequelize that each post belongs to a user   
                      // sequelize will create the field needed in the DB
                      // for us
  
// .sync creates the actual tables in the DB. Sequelize will use
// the models we've defined and ensure the table has correct fields
// with the types etc.
sequelize
  .sync({ force: false })
  .then(function(err) {
    console.log('Synced db successfully.');
  }, function (err) { 
    console.log('An error occurred while syncing:', err);
  });
  


// launch the app
var app = express();

// parse request body as url encoded data (form data)
app.use(bodyParser.urlencoded());

app.post('/signup', function (req, res) {
  // store the user in the db
  User.create({
    name: req.body.username,
    password: req.body.password
  }).then((u) => {
    res.send(u); // send back the new user
  }, (err) => { 
    res.status(400).send(err); // if error, just set status and return it
  });
});

app.get('/users', function(req, res) {
  User.findAll().then(function(users) {
    res.send(users);
  });
});

app.post('/posts', function(req, res) {
  sequelize.Promise.all([ // first, we find the user and create the post
    User.findById(req.body.user_id),
    Post.create({
      title: req.body.title, 
      body: req.body.body
    })
  ]).spread(function (user, post) { // when both of those are done...
    // set that this post belongs to the user
    post.setUser(user);
  });
});

// just find and return all posts
app.get('/posts', function(req, res) {
  Post.findAll().then(function(posts) {
    res.send(posts);
  });
});

app.get('/posts/:postId', function(req, res) {
  // TODO return only the post with id postId from the request
  // TODO attach the full user object to that post 
  // TODO attach all comments from the db to this post
  res.send(posts);
});

// TODO create a comment in the db for the specified post
app.post('/posts/:postId/comments', function(req,res) {
  
});



app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`);
});