import express from "express";
import { userLogin, userLogout, userRegister } from "../controllers/UserController";
import { protect } from "../middleware/authmiddleware";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", protect, userLogout)


export default router;