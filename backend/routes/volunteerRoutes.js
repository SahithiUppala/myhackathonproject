const router = require("express").Router();
const ctrl = require("../controllers/volunteerController");

router.post("/accept", ctrl.acceptPickup);
router.post("/tracking", ctrl.updateTracking);

module.exports = router;
