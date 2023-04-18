import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    updateUserProfile,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:id", verifyToken, getUser);                  
router.get("/edit/:id", verifyToken, getUser);                 
router.get("/:id/friends", verifyToken, getUserFriends);

/* Update */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.put("/:id", verifyToken, updateUserProfile);

export default router;