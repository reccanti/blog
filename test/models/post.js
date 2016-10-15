const db = require('mongoose');
const Post = require('../../models/post');
const expect = require('chai').expect;

describe('Post', function () {
    
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
            done();
        }); 
    });

    // create a post
    it('expects to be able to create a Post', function () {
        Post.create({
            'title': 'a blog post',
            'contents': 'hello'
        }, function (err, doc) {
            expect(doc).to.be.an('object');
            expect(doc.title).to.equal('a blog post');
            expect(doc.contents).to.equal('hello');
        });
    });

    // retrieve a post by ID
    // retrieve a post by name
    // edit a post
    // delete a post
});
