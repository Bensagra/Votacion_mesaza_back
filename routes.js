import { Router } from "express";
import { userControllers } from "./controllers/user_controllers.js";
import { computerControllers } from "./controllers/computer_controllers.js";
import { gettersControllers } from "./controllers/getters_controllers.js";
import { professorControllers } from "./controllers/professor_controllers.js";
import { asistenteControllers } from "./controllers/asistentes_controllers.js";




const router = Router();

router.get("/food", userControllers.getFood);
router.post("/vote", userControllers.voteFood);
router.get("/totalVotes", userControllers.getTotalVotes);

export default router;