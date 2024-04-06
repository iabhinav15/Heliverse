import { Team } from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Create a new team
const createTeam = asyncHandler(async (req, res) => {

    const team = new Team(req.body);

    const newTeam = await team.save();

    if(!newTeam) throw new ApiError(500, "Something went wrong while creating the team");

    return res.status(201).json(new ApiResponse(200, newTeam, "Team created successfully"));
  
})


//  Get all teams
const getAllTeam = asyncHandler(async (req, res) => {

    const allteams = await Team.find().populate("teamMembers");

    return res.status(200).json(new ApiResponse(200, allteams, "All teams retrieved successfully"));
 
})


// Get a team by id
const getTeam = asyncHandler(async (req, res) => {

    const team = await Team.findById(req.params.id).populate("teamMembers");

    if(!team) throw new ApiError(404, "Team not found");
    
    return res.status(200).json(new ApiResponse(200, team, "Team retrieved successfully"));
 
})



export {
  createTeam,
  getTeam,
  getAllTeam}