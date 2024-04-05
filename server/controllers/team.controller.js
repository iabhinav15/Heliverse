import { Team } from "../models/team.model.js";


const createTeam = async (req, res) => {

  try {
    const team = new Team(req.body);
    const newTeam = await team.save();
    res.status(201).json({
      success: true,
      message: "Team created successfully",
      newTeam,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getAllTeam = async (req, res) => {
  try {
    const allteams = await Team.find().populate("teamMembers");
    res.status(200).json({
      success: true,
      allteams,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("teamMembers");
    res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



export {
  createTeam,
  getTeam,
  getAllTeam}