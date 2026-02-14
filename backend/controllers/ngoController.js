const db = require("../config/firebaseAdmin");

// AVAILABLE FOOD
exports.availableFood = async (req, res) => {
  try {
    const snapshot = await db
      .collection("donations")
      .where("status", "==", "pending")
      .get();

    let list = [];
    snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

    res.json(list);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ACCEPT / REJECT
exports.respondDonation = async (req, res) => {
  try {
    const { donationId, ngoId, action } = req.body;

    const status = action === "accept" ? "accepted" : "rejected";

    await db.collection("donations").doc(donationId).update({
      ngoId,
      status
    });

    res.json({ message: `Donation ${status}` });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ASSIGN VOLUNTEER
exports.assignVolunteer = async (req, res) => {
  try {
    const { donationId, volunteerId } = req.body;

    await db.collection("donations").doc(donationId).update({
      volunteerId,
      status: "assigned"
    });

    res.json({ message: "Volunteer assigned" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
