var mongoose = require('mongoose');

var LeaveSchema = new mongoose.Schema({

        schedule_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'schedule',
        },
        leave_staff_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
        },
        alter_staff_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
        },
        status: String,
        reason: String,

        blocked: {type: Number, default: 0},
        updated_at: {type: Date, default: Date.now},
        leave_date: Date,
    },

    {collection: 'leave'}
);

module.exports = mongoose.model('leave', LeaveSchema);
