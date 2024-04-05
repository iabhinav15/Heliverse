import { Router } from "express";
import { deleteUser, getAllUsers, getUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/get-allusers").get(getAllUsers)
router.route("/get-user/:id").get(getUser)
router.route("/update-user/:id").put(updateUser)
router.route("/delete-user/:id").delete(deleteUser)



export default router