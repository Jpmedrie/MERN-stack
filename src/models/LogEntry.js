const mongoose = require('mongoose');

const { Schema } = mongoose;

// *Title - Text
// *Description - Text
// *Comments - Text
// *Rating - scale 1 to 5
// *Image - Text - URl
// *Latitude - Number
// *Longitude - Number
// *Created At - DateTime
// *Updated At - DateTime

const requiredNumber = {
  type: Number,
  required: true,
};

const defaultDate = {
  type: Date,
  default: Date.now,
  required: true,
};

const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    required: true,
    type: Date,

  },
  created_at: defaultDate,
  updated_at: defaultDate,
}, {
  timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
