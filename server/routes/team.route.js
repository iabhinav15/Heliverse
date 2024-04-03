import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTeam, getTeam } from "../controllers/team.controller.js";
const router = Router();


router.route("/create-team").post(createTeam);
router.route("/get-team").get(getTeam);