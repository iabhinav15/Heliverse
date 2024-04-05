import { Router } from "express";
import { createTeam, getAllTeam, getTeam } from "../controllers/team.controller.js";
const router = Router();


router.route("/create-team").post(createTeam);
router.route("/get-allteam").get(getAllTeam);
router.route("/get-team/:id").get(getTeam); // /api/teams/get-team/:id

export default router;