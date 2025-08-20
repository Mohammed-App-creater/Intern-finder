import { Router } from "express";
import * as talentController from "./talent.controller";

const router = Router();

router.post("/register", talentController.registerTalent);
router.get("/profile/:id", talentController.getTalentProfile);
router.put("/profile/:id", talentController.updateTalentProfile);

export default router;
