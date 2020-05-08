const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    data_access_expiration_time: Number,
    expiresIn: Number,
    graphDomain: String,
    signedRequest: String,
    userID: String,
  },
  { emitIndexErrors: true },
);

userSchema.index({ employeeID: 1 });

userSchema.statics.upsertByEmployeeID = function upsertByEmployeeID(userID, payload) {
  return this.findOneAndUpdate({ userID }, payload, {
    upsert: true,
    new: true,
    useFindAndModify: false,
  })
    .lean()
    .exec();
};

export default mongoose.model('User', userSchema);
