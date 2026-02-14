const express = require("express");
const cors = require("cors");
const path = require("path");
const fb = require("./config/firebaseAdmin");
console.log("Firebase loaded");

const authRoutes = require("./routes/authRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());


/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/donor", require("./routes/donationRoutes"));
app.use("/ngo", require("./routes/ngoRoutes"));
app.use("/volunteer", require("./routes/volunteerRoutes"));
app.use("/tracking", require("./routes/trackingRoutes"));


/* ================= SERVE FRONTEND ================= */

/*
   Assuming structure:

   project/
     ├── backend/
     │     server.js
     └── frontend/
           index.html
*/

app.use(express.static(path.join(__dirname, "../frontend")));


/* Default Route → Open index.html */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
