const router = require("express").Router();
const ctrl = require("../controllers/ngoController");

router.get("/available", ctrl.availableFood);
router.post("/respond", ctrl.respondDonation);
router.post("/assign", ctrl.assignVolunteer);

module.exports = router;
