import express from "express";
import { protect } from "../middleware/authmiddleware";
import { adminOnly } from "../middleware/rolemiddleware";
import { upload } from "../config/uploads";
import { createEvent } from "../controllers/EventController";



const router = express.Router();

router.get("/profile", protect, (req, res) =>{
    res.json({
        message: "User Profile"
    })
})


router.post("/create-event", protect, adminOnly, upload.single('image'), createEvent)


export default router;
