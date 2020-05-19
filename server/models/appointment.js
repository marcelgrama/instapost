const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  userId: Schema.Types.String,
  title: Schema.Types.String,
  startTime: Schema.Types.Date,
  story: Schema.Types.Boolean,
  post: Schema.Types.Boolean,
});

export default mongoose.model('Appointment', AppointmentSchema);
