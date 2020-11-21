var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
        fullName: String,
        user_id: String,
        email: String,
        password: String,
        mobile: String,
        role: String,
        department: String,

        blocked: {type: Number, default: 0},
        verified: {type: Boolean, default: true},
        updated_at: {type: Date, default: Date.now},
        register_date: {type: Date,default: Date.now},
    },

    {collection: 'users'}
);

module.exports = mongoose.model('users', UsersSchema);
