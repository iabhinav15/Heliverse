import mongoose from 'mongoose';

// Team schema
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

// Model
export const Team = mongoose.model('Team', teamSchema);
