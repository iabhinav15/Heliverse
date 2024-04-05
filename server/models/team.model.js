import mongoose from 'mongoose';

// create a schema
const teamSchema = new mongoose.Schema({

  teamName: {
    type: String,
    required: true
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
});

// create a model
export const Team = mongoose.model('Team', teamSchema);
