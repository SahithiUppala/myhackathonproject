const db = require("../config/firebaseAdmin");

// ACCEPT PICKUP
exports.acceptPickup = async (req, res) => {
  try {
    const { donationId } = req.body;

    await db.collection("donations").doc(donationId).update({
      status: "picked"
    });

    res.json({ message: "Pickup accepted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// UPDATE TRACKING
exports.updateTracking = async (req, res) => {
  try {
    const { donationId, location, status } = req.body;

    await db.collection("donations").doc(donationId).update({
      location,
      status
    });

    res.json({ message: "Tracking updated" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
