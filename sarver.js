const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./models/User");
const Feedback = require("./models/Feedback");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Atlas URL અહીં પેસ્ટ કરવી (પાછળ સમજાવું છું)
mongoose.connect("YOUR_MONGO_URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => console.log("❌ MongoDB Error:", err));

// 🔹 Signup API
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User Registered Successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) res.json({ message: "Login Successful!" });
  else res.status(401).json({ error: "Invalid Credentials" });
});

// 🔹 Feedback API
app.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ message: "Feedback Submitted!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("📸 Photo App Backend Running Successfully!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
