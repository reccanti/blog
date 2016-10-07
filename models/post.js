const mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    contents: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
});

PostSchema.findByTitle = function (title, cb) {
    return this.find({ title: title}, cb);
};

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
