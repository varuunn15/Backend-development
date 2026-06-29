const express = require('express');
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middlware");

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:username
 * @description Send follow request
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController);

/**
 * @route POST /api/users/unfollow/:username
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController);

/**
 * @route GET /api/users/follow/requests
 * @description Get pending follow requests
 * @access Private
 */
userRouter.get("/follow/requests", identifyUser, userController.getPendingRequestsController);

/**
 * @route PATCH /api/users/follow/accept/:username
 * @description Accept follow request
 * @access Private
 */
userRouter.patch("/follow/accept/:username", identifyUser, userController.acceptFollowRequestController);

/**
 * @route PATCH /api/users/follow/reject/:username
 * @description Reject follow request
 * @access Private
 */
userRouter.patch("/follow/reject/:username", identifyUser, userController.rejectFollowRequestController);

module.exports = userRouter;