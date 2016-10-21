// const koa = require('koa');
// const app = koa();

// app.use(function *() {
//     this.body = 'Hello world';
// });

// app.listen(3000);

// const MongoClient = require('mongodb');
// const config = require('./config/config');

// MongoClient.connect(config.database, (err, db) => {
//     var collection = db.collection('post');
//     collection.find({}).toArray((err, docs) => {
//         console.log(docs);
//     });
//     db.close();
// });

// const db = require('monk')('localhost/reccantiblog');
'use strict';
const db = require('mongoose');
const app = require('koa')();
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const views = require('koa-render');

const Post = require('./models/post');
const User = require('./models/user');

db.Promise = global.Promise;

db.connect(require('./config/config').dev.database);
User.remove({}, function (err) {
    console.log('users removed');
});

// real secure!
User.create({
    'username': 'reccanti',
    'password': 'password'
}).then(function (doc) {
    console.log(doc.username + " created!");
});

router
    .post('auth', '/api/authenticate', function *(next) {
        const username = this.request.body.username;
        const password = this.request.body.password;
        let app = this;
        yield User.findOne({
            username: username
        }).exec()
        .then(function (user) {
            if (!user) {
                app.status = 404;
                app.message = 'Authentication failed. User not found';
            } else if (user) {
                if (user.password !== password) {
                    app.status = 404;
                    app.message = 'Authentication failed. Wrong password.';
                } else {
                    console.log('authenticated!');
                    app.status = 200;
                    app.message = 'Successfully authenticated';
                }
            }
        })
        .catch(function(err) {
            console.log(err);
            throw err;
        });
        yield next;
    });
// Post.remove({}, function(err) {
//     console.log('posts removed');
// })

// // define routes
// router
//     .get('home', '/', function *(next) {
//         this.body = yield this.render('index');
//     })
//     .get('posts', '/posts', function *(next) {
//         this.body = "posts";
//     })
//     .post('post', '/post', function *(next) {
//         const post = new Post({
//             title: "Test Post",
//             contents: "success"
//         });
//         post.save();
//         console.log('post saved');
//     });

// app.use(views('./views', 'pug'));
app.use(bodyparser());
app.use(router.routes());
app.listen(3000);
