const db = require('mongoose');
db.Promise = global.Promise;
const Post = require('../../models/post');
const expect = require('chai').expect;

describe('Post', function () {
    
    /**
     * Set the promise library to Node's default
     */
    before(function (done) {
        db.Promise = global.Promise;
        db.connect('mongodb://localhost/reccantiblogtest');
        Post.remove({}, function () {
            done();  
        });
    });

    after(function (done) {
        db.connection.close();
        done();
    })
    /**
     * After each test, delete all Posts from the database
     */
    afterEach(function (done) {
        Post.remove({}, function () {
            done();
        }); 
    });

    // create a post
    it('expects to be able to create a Post', function () {
        const post = {
            'title': 'a blog post',
            'contents': 'hello'
        };
        return Post.create(post)
            .then(
                function (doc) {
                    expect(doc).to.be.an('object');
                    expect(doc.title).to.equal('a blog post');
                    expect(doc.contents).to.equal('hello');
                }
            );
    });

    // should not be able to create a post with a duplicate name

    // retrieve a post by ID
    it('expects to be able to find a post by its ID', function () {
        const post = {
            'title': 'a blog post',
            'contents': 'hello'
        };
        return Post.create(post)
            .then(function (doc) {
                return Post.findById(doc._id).exec();
            })
            .then(function (doc) {
                expect(doc).to.be.an('object');
                expect(doc.title).to.equal('a blog post');
                expect(doc.contents).to.equal('hello');
            });
    });

    // retrieve a post by its title
    it('expects to be able to find a post by its name', function () {
        const post = {
            'title': 'a blog post',
            'contents': 'hello'
        };
        return Post.create(post)
            .then(function (doc) {
                return Post.findByTitle('a blog post');
            })
            .then(function (doc) {
                expect(doc).to.be.an('object');
                expect(doc.title).to.equal('a blog post');
                expect(doc.contents).to.equal('hello');
            });
    });
    // edit a post
    // delete a post
});
