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

const db = require('monk')('localhost/reccantiblog');
const app = require('koa')();
const router = require('koa-router')();

router
    .get('home', '/', function *(next) {
        this.body = "welcome home";
    })
    .get('posts', '/posts', function *(next) {
        this.body = "posts";
    });

app.use(router.routes());
app.listen(3000);
