const express = require("express");
const router = express.Router();
const notify = require('../handlers/Notification/notifyHandler')
const authtoken = require("../middlewares/authentication/authentication");

router.post("/pushNotify", authtoken.Authentication, authtoken.adminVerify, notify.postNotification);
router.get("/getRealtimeNotify", notify.getLiveNotification);
router.get("/getNotify", notify.getNotification);
module.exports = router;