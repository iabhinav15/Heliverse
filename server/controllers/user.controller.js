import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
 

// Create a new user
const createUser = asyncHandler( async (req, res) => {

    const {first_name, last_name,  email, gender, avatar, domain, available } = req.body;
    
    if (
        [first_name, last_name, email, gender].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        first_name,
        last_name,
        avatar,
        email,
        gender,
        domain,
        available
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created Successfully")
    )

} )


// Get all users
const getAllUsers = asyncHandler(async(req, res) => {

        let query = {};
        
        // Check if there is a query for search
        if(req.query.search) {
          const searchRegex = new RegExp(req.query.search, 'i'); // Case-insensitive search
          query = {
            $or: [
              { first_name: searchRegex },
              { last_name: searchRegex }
            ]
          };
        }
        
        // Check if there is a query for gender
        if(req.query.gender) {
            // Split the comma-separated string into an array of gender values
            const genders = req.query.gender.split(',');
            query.gender = { $in: genders };
        }

        // Check if there is a query for avalability
        if(req.query.available) {
            query.available = req.query.available;
        }

        // Check if there is a query for domain
        if(req.query.domain) {
            const domain = req.query.domain.split(',');
            query.domain = { $in: domain };
        }
        // Count total number of users based on the query
        const totalUsersCount = await User.countDocuments(query);
        
        // Pagination logic
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
    
        // Calculate the index to start from
        const startIndex = (page - 1) * limit;
    
        // Find users based on the query and apply pagination
        const users = await User.find(query)
          .skip(startIndex)
          .limit(limit);
        
        // Calculate total number of pages
        const totalPages = Math.ceil(totalUsersCount / limit);

        return res.status(200)
        .json({
            status: 'success',
            data: users,
            page,
            totalPages
        });
        
})


const getUser = asyncHandler(async(req, res) => {
    // fetch a user by id from param
    const user = await User.findById(req.params.id).select("-password");
    
    // send the user
    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "User fetched successfully")
    )

})

// Update user details
const updateUser = asyncHandler(async(req, res) => {

    const {first_name, last_name,  email, gender, avatar, domain, available } = req.body;
    const userId = req.params.id;

    if (
        [first_name, last_name, email, gender].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const user = {
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available
    }

    // Find the user by id and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, user, {new: true}).select(
        "-password"
    )

    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong while updating the user")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "User updated successfully")
    )

})


// Delete a user
const deleteUser = asyncHandler(async(req, res) => {

    // It returns the user which was deleted
    await User.findByIdAndDelete(req.params.id);

    return res
    .status(200)
    .json({
            success: true,
            message: "User deleted successfully"
        })
})

export {
    createUser,
    getUser,
    updateUser,
    getAllUsers,
    deleteUser
}