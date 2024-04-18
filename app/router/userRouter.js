const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const { upload } = require("../middleware/upload")

router.post("/add_schedule", userController.addSchedule);
router.post("/apply_now", upload, userController.apply_now);
router.post("/contact_us", userController.contact_us);


router.get("/our_client", userController.our_client);
router.get("/our_team", userController.our_team);
router.get("/portfolio", userController.portfolio);
router.get("/open_position", userController.open_position);


module.exports = router