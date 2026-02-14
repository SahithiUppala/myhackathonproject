const { auth } = require("../../config/firebaseAdmin");
const User = require("../../models/User");


/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Create Firebase Auth user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // Store extra data in Firestore
    await User.createUser(userRecord.uid, {
      name,
      email,
      role
    });

    res.status(201).json({
      message: "User registered successfully",
      uid: userRecord.uid
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
