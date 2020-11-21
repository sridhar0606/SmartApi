var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
        },
        status: String,
        title: String,
        description: String,
        department: Array,

        blocked: {type: Number, default: 0},
        updated_at: {type: Date, default: Date.now},
        end_date: Date,
    },

    {collection: 'news'}
);

module.exports = mongoose.model('news', NewsSchema);
