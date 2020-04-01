const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const ActivitySchema = new Schema({
  activityType: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  circleId: { type: Schema.Types.ObjectId, ref: 'Circle' },
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll' },
  invitedEmail: [String],
  eventVoteOrQuestionAnswer: String,
  timeStamp: String
});

ActivitySchema.statics.getActivitiesAndDescriptionData = function getActivityAndDescriptionData(
  userCircles
) {
  return this.find({ circleId: { $in: userCircles } })
    .populate('authorId', 'name')
    .populate('circleId', 'name')
    .populate('pollId', 'title')
    .sort({ timeStamp: 'desc' })
    .then(activities => activities);
};

export default mongoose.model('Activity', ActivitySchema);
