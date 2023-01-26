const express = require('express')

const router = express.Router()

const liveController = require("./controller");

router.get("/get-token/:roomName/:participantName", liveController.CreateAndJoinStream);
router.get("/list-Rooms", liveController.listRooms);
router.get("/deleteRoom", liveController.deleteRoom);



module.exports = router;