var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
        period: String,
        staff: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
        },
        status: String,
        department: String,
        subject: String,
        blocked: {type: Number, default: 0},
        updated_at: {type: Date, default: Date.now},
        schedule_date: Date,
    },

    {collection: 'schedule'}
);

module.exports = mongoose.model('schedule', ScheduleSchema);
