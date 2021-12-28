'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create the schema
const meetingSchema = new Schema({
  meeting_id: { type: String, required: true },
  meeting_type: { type: String, required: true },
  meeting_content: String,
  meeting_date: { type: String, required: true },
  meeting_number: { type: Number, required: true, unique: true },
  meeting_status: { type: String, required: true, default: 'Pending' },
  customer_username: { type: String, required: true },
  customer_email: { type: String, required: true },
  customer_position: String,
});

// create new model
const meetingModel = mongoose.model('meeting', meetingSchema);

module.exports = meetingModel;