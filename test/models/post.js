const db = require('mongoose');
db.Promise = global.Promise;
const Post = require('../../models/post');
const expect = require('chai').expect;

describe('Post', function () {
    
    // /**
    //  * Set the promise library to Node's default
    //  */
    // before(function (done) {
    //     db.Promise = global.Promise;
    //     done();
    // });

    /**
     * Before each test, connect to the database
     */
    beforeEach(function (done) {
        db.connect('mongodb://localhost/reccantiblogtest');
        done();
    });

    /**
     * After each test, delete all Posts from the database
     */
    afterEach(function (done) {
        Post.remove({}, function () {
            db.connection.close();
            done();
        }); 
    });

    // create a post
    it('expects to be able to create a Post', function () {
        const post = {
            'title': 'a blog post',
            'contents': 'hello'
        };
        Post.create(post)
            .then(function (err, doc) {
                expect(doc).to.be.an('object');
                expect(doc.title).to.equal('a blog post');
                expect(doc.contents).to.equal('hello');
            });
    });

    // should not be able to create a post with a duplicate name

    // retrieve a post by ID
    it('expects to be able to find a post by ID', function () {
        const post = {
            'title': 'a blog post',
            'contents': 'hello'
        };
        Post.create(post)
            .then(function (err, doc) {
                return Post.findOne({ _id: doc._id });
            })
            .then(function (err, doc) {
                expect(doc).to.be.an('object');
                expect(doc.title).to.equal('a blog post');
                expect(doc.contents).to.equal('hello');
            });
    });

    // retrieve a post by name
    // edit a post
    // delete a post
});
