const db = require('mongoose');
db.Promise = global.Promise;
const Post = require('../../models/post');
const expect = require('chai').expect;

describe('Post', function () {
    
    /**
     * Set the promise library to Node's default,
     * connect to the database and
     * clear any existing Posts
     */
    before(function (done) {
        db.Promise = global.Promise;
        db.connect(require('../../config/config').test.database);
        Post.remove({}, function () {
            done();  
        });
    });

    /**
     * disconnect from the database after the tests
     */
    after(function (done) {
        db.connection.close();
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
    it('expects to fail if the user tries to create a Post with duplicate name', function () {
        const post1 = {
            'title': 'a blog post',
            'contents': 'post1'
        };
        const post2 = {
            'title': 'a blog post',
            'contents': 'post2'
        };
        return Post.create(post1)
            .then(function (doc) {
                return Post.create(post2);
            })
            .then(function (doc) {
                // should not reach here
                expect(doc).not.to.be.an('object');
            })
            .catch(function (err) {
                expect(err).to.be.an.instanceOf(Error);
            });
    });

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
    it('expects to be able to edit a post', function () {
        const initialData = {
            'title': 'a blog post',
            'contents': 'hello'
        };
        return Post.create(initialData)
            .then(function (doc) {
                expect(doc.title).to.equal('a blog post');
                expect(doc.contents).to.equal('hello');

                doc.title = 'an updated title';
                doc.contents = 'goodbye';
                return doc.save();
            })
            .then(function (doc) {
                return Post.findById(doc._id).exec();
            })
            .then(function (doc) {
                expect(doc.title).to.equal('an updated title');
                expect(doc.contents).to.equal('goodbye');
            });
    });

    // delete a post
    it('expects to be able to delete a post', function () {
        const post = {
            'title': 'a blog post',
            'contents': 'hello'
        };
        var id = null;
        return Post.create(post)
            .then(function (doc) {
                id = doc._id
                return Post.findById(id).exec();
            })
            .then(function (doc) {
                return doc.remove();
            })
            .then(function (doc) {
                return Post.findById(id).exec();
            })
            .then(function (doc) {
                expect(doc).to.be.null;
            });
    });
});
