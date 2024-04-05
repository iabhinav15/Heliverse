import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
 

const registerUser = asyncHandler( async (req, res) => {

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
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})


const getAllUsers = asyncHandler(async(req, res) => {
    try {
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
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
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


// function to update user details
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

    const updatedUser = await User.findByIdAndUpdate(userId, updateUser, {new: true}).select(
        "-password"
    )

    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong while updating the user")
    }

    return res.status(200).json({
        success: true,
        message: "User updated successfully.",
        updatedUser,
    })
})

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
    registerUser,
    loginUser,
    getUser,
    updateUser,
    getAllUsers,
    deleteUser
}