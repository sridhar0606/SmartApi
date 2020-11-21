var mongoose = require('mongoose');

var MaterialSchema = new mongoose.Schema({
        type: String,
        staff: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
        },
        description: String,
        title: String,
        link: String,
        department: String,

        blocked: {type: Number, default: 0},
        updated_at: {type: Date, default: Date.now},
    
    },

    {collection: 'material'}
);

module.exports = mongoose.model('material', MaterialSchema);
