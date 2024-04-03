import mongoose from 'mongoose';


// create a schema
const teamSchema = new mongoose.Schema({

  teamName: {
    type: String,
    required: true
  },
  teamMembers: {
    type: Array,
    required: true
  },
  // teamLeader: {
  //   type: String,
  //   required: true
  // },
  // teamDescription: {
  //   type: String,
  //   required: true
  // },
  // teamImage: {
  //   type: String,
  //   required: true
  // },
  // teamStatus: {
  //   type: String,
  //   required: true
  // },
  // teamCreatedDate: {
  //   type: Date,
  //   default: Date.now
  // },
  // teamUpdatedDate: {
  //   type: Date,
  //   default: Date.now
  // }
});

// create a model
export const Team = mongoose.model('Team', teamSchema);
