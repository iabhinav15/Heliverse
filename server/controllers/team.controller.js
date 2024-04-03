import { Team } from "../models/team.model";


const createTeam = async (req, res) => {
  try {
    const { teamName, teamMembers } = req.body;
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.status(200).json(team);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export {
  createTeam,
  getTeam}