const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

// Send Follow Request
async function followUserController(req, res) {
    try {
        const followerUsername = req.user.username;
        const followeeUsername = req.params.username;

        if (followeeUsername === followerUsername) {
            return res.status(400).json({
                message: "You cannot follow yourself."
            });
        }

        const isFolloweeExists = await userModel.findOne({
            username: followeeUsername
        });

        if (!isFolloweeExists) {
            return res.status(404).json({
                message: "User you are trying to follow does not exist."
            });
        }

        const existingRequest = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        });

        if (existingRequest) {

            if (existingRequest.status === "pending") {
                return res.status(400).json({
                    message: "Follow request already pending."
                });
            }

            if (existingRequest.status === "accepted") {
                return res.status(400).json({
                    message: `You are already following ${followeeUsername}.`
                });
            }

            // If request was rejected, send it again
            existingRequest.status = "pending";
            await existingRequest.save();

            return res.status(200).json({
                message: `Follow request sent again to ${followeeUsername}.`,
                follow: existingRequest
            });
        }

        const followRecord = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername,
            status: "pending"
        });

        res.status(201).json({
            message: `Follow request sent to ${followeeUsername}.`,
            follow: followRecord
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Accept Follow Request
async function acceptFollowRequestController(req, res) {
    try {
        const followeeUsername = req.user.username;
        const followerUsername = req.params.username;

        const request = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
            status: "pending"
        });

        if (!request) {
            return res.status(404).json({
                message: "No pending request found."
            });
        }

        request.status = "accepted";
        await request.save();

        res.status(200).json({
            message: `${followerUsername} is now following you.`,
            follow: request
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Reject Follow Request
async function rejectFollowRequestController(req, res) {
    try {
        const followeeUsername = req.user.username;
        const followerUsername = req.params.username;

        const request = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
            status: "pending"
        });

        if (!request) {
            return res.status(404).json({
                message: "No pending request found."
            });
        }

        request.status = "rejected";
        await request.save();

        res.status(200).json({
            message: "Follow request rejected.",
            follow: request
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get Pending Requests
async function getPendingRequestsController(req, res) {
    try {
        const username = req.user.username;

        const requests = await followModel.find({
            followee: username,
            status: "pending"
        });

        res.status(200).json({
            requests
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Unfollow User
async function unfollowUserController(req, res) {
    try {
        const followerUsername = req.user.username;
        const followeeUsername = req.params.username;

        const isUserFollowing = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
            status: "accepted"
        });

        if (!isUserFollowing) {
            return res.status(400).json({
                message: `You are not following ${followeeUsername}.`
            });
        }

        await followModel.findByIdAndDelete(isUserFollowing._id);

        res.status(200).json({
            message: `You have unfollowed ${followeeUsername}.`
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    followUserController,
    unfollowUserController,
    getPendingRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController
};