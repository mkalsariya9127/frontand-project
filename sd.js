// --- Popup Open/Close Functions ---
document.getElementById("loginBtn").addEventListener("click", function() {
  document.getElementById("loginForm").style.display = "flex";
});

document.getElementById("signupBtn").addEventListener("click", function() {
  document.getElementById("signupForm").style.display = "flex";
});

function closeForm(formId) {
  document.getElementById(formId).style.display = "none";
}

// --- Search Function ---
function searchGallery() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const items = document.querySelectorAll(".gallery-item");

  items.forEach(item => {
    const name = item.dataset.name.toLowerCase();
    if (name.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/sdphotography", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ " + err));

// 🔹 Schema
const starSchema = new mongoose.Schema({
  rating: Number,
  date: { type: Date, default: Date.now }
});

const StarFeedback = mongoose.model("StarFeedback", starSchema);

// 🔹 Route
app.post("/star-feedback", async (req, res) => {
  try {
    const { rating } = req.body;
    const newRating = new StarFeedback({ rating });
    await newRating.save();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));




// --- Close popup if clicked outside ---
window.addEventListener("click", function(event) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (event.target === loginForm) {
    loginForm.style.display = "none";
  }
  if (event.target === signupForm) {
    signupForm.style.display = "none";
  }
});



// ✅ Sign Up Logic
document.querySelector("#signupForm button").addEventListener("click", async () => {
  const inputs = document.querySelectorAll("#signupForm input");
  const payload = {
    name: inputs[0].value,
    email: inputs[1].value,
    mobile: inputs[2].value,
    password: inputs[3].value,
  };

  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  alert(data.message);
});

// ✅ Login Logic
document.querySelector("#loginForm button").addEventListener("click", async () => {
  const inputs = document.querySelectorAll("#loginForm input");
  const payload = {
    email: inputs[0].value,
    password: inputs[1].value,
  };

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  alert(data.message);
});




window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("intro").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 3500); // 
});




