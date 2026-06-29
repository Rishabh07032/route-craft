console.log("DELETE ROUTE REGISTERED");
const OpenAI = require("openai");
const Trip = require("./models/Trip");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT ERROR:", err);w
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

const express = require("express");
const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });

app.use(cors());
app.use(cors({ origin: 'https://routecraft-air.onrender.com',
  credentials:true
 }));
app.use(express.json());
console.log("API KEY:", process.env.GEMINI_API_KEY?.slice(0, 10));

// Gemini Setup
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});
// Home Route
app.get("/", (req, res) => {
  res.send("Tourism Planner Backend Running 🚀");
});

// Generate Trip Route
app.post("/generate-trip", async (req, res) => {
  try {
    console.log("Gemini Route Hit");
    console.log(req.body);

    const {
      destination,
      budget,
      days,
      travelType,
    } = req.body;

   const prompt = `
You are an elite AI Travel Planner.

Create a modern, concise, premium travel itinerary for:

📍 Destination: ${destination}
💰 Budget: ₹${budget}
📅 Duration: ${days} Days
👥 Travel Type: ${travelType}

IMPORTANT RULES:

- Keep the entire response under 500 words.
- Use short bullet points.
- Avoid long paragraphs.
- Make the output mobile-friendly.
- Use emojis.
- Mention only the most important recommendations.
- Maximum 3 activities per day.
- Keep each activity within one line.
- Focus on practical and realistic suggestions.

Use EXACTLY this format:

# 🌍 Trip Snapshot

📍 Destination:
💰 Budget:
📅 Duration:
🌦 Best Time to Visit:

# 🏨 Best Stay

- Hotel Name
- Approx Cost
- Why Recommended

# 🍴 Must-Try Food

- Item 1
- Item 2
- Item 3

# 📸 Top Photo Spots

- Spot 1
- Spot 2
- Spot 3

# 📅 Day 1

🌅 Morning:
- Activity

☀️ Afternoon:
- Activity

🌇 Evening:
- Activity

💸 Estimated Daily Cost:

# 📅 Day 2

🌅 Morning:
- Activity

☀️ Afternoon:
- Activity

🌇 Evening:
- Activity

💸 Estimated Daily Cost:

(Continue till all days are covered)

# 🛍 Shopping Picks

- Place 1
- Place 2

# ⚠️ Travel Tips

- Tip 1
- Tip 2
- Tip 3

# ✅ Quick Summary

Provide a 2-line luxury travel summary.

DO NOT:
❌ Write long paragraphs
❌ Explain unnecessary details
❌ Repeat information
❌ Exceed 500 words

Make the itinerary feel like a premium travel app rather than a travel article.
`;
    console.log("Calling Gemini...");

    const result = await model.generateContent(prompt);

    console.log("Gemini Success");

    const response = result.response.text();
    let weatherData = null;
    let forecastData = [];

try {
  const weatherResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
  );


try {
  const forecastResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${destination}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
  );

  forecastData = forecastResponse.data.list
    .filter(item => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map(item => ({
      date: item.dt_txt.split(" ")[0],
      temp: Math.round(item.main.temp),
      condition: item.weather[0].main,
    }));

} catch (err) {
  console.log("Forecast Error:");
  console.log(err.response?.data);
  console.log(err.message);
}
  weatherData = {
    temp: weatherResponse.data.main.temp,
    condition: weatherResponse.data.weather[0].main,
    humidity: weatherResponse.data.main.humidity,
    wind: weatherResponse.data.wind.speed,
  };
} catch (err) {
  console.log("Weather fetch failed");
}
    let imageUrls = [];

try {
  const imageResponse = await axios.get(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        query: destination,
        per_page: 5,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  imageUrls = imageResponse.data.results.map(
    (img) => img.urls.regular
  );

} catch (err) {
  console.log("Unsplash image fetch failed");
}

const trip = new Trip({
  destination,
  budget,
  days,
  travelType,
  itinerary: response,
});

await trip.save();

console.log("Trip Saved Successfully");   
res.json({
  success: true,
  itinerary: response,
images: imageUrls,
  weather: weatherData,
  forecast: forecastData,
});

  } catch (error) {
    console.error("GEMINI ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});
// console.log("RECOMMENDED ROUTE REGISTERED");
app.post("/recommended-destinations", async (req, res) => {
    // console.log("RECOMMENDED ROUTE HIT");

  try {
    const { destination } = req.body;

    const prompt = `
You are an AI travel expert.

A user searched for: ${destination}

Suggest 6 similar travel destinations in India.

For each destination return ONLY:

Name
Reason (1 short sentence)
Budget
Best Season

Return the response in JSON format.
`;
console.log("Before OpenRouter");

const completion = await openrouter.chat.completions.create({
  model: "deepseek/deepseek-chat",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

const text = completion.choices[0].message.content;

const recommendations = JSON.parse(
  text
    .replace(/```json/g, "")
    .replace(/```/g, "")
);

console.log("After OpenRouter");
for (let place of recommendations) {
  try {
    const imageResponse = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: place.Name,
          per_page: 1,
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    place.image =
      imageResponse.data.results[0]?.urls?.regular || "";

  } catch (err) {
  place.image =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
}
}
console.log("TYPE:", typeof recommendations);
console.log("IS ARRAY:", Array.isArray(recommendations));

    res.json({
  success: true,
  data: recommendations,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});

// Test Gemini Route
app.get("/test-gemini", async (req, res) => {
  try {
    const result = await model.generateContent("Say Hello");

    res.json({
      success: true,
      text: result.response.text(),
    });

  } catch (error) {
    console.error("TEST GEMINI ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
});

app.post("/chat-assistant", async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
You are RouteCraft AI.

You ONLY answer travel-related questions.

You are NOT allowed to:
- Generate itineraries
- Plan trips
- Answer coding questions
- Answer maths
- Answer politics
- Answer medical questions
- Answer anything unrelated to travel.

If user asks for trip planning or itinerary generation, reply:

"Please use RouteCraft's AI Trip Planner for complete itinerary generation."

If user asks anything unrelated to travel, reply:

"I'm RouteCraft AI. I can only help with travel-related questions."

User Question:
${message}
`;

    const completion = await openrouter.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});

console.log("NEW GEMINI SERVER RUNNING");
app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Signup Successful",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.post("/login", async (req, res) => {

  console.log("LOGIN BODY:", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "rishabh_secret_key",
      { expiresIn: "7d" }
    );

    
    res.json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
console.log("INDEX FILE LOADED");
const PORT = 5000;
app.get("/my-trips", async (req, res) => {
  try {
    const trips = await Trip.find().sort({
      createdAt: -1,
    });

    res.json(trips);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching trips",
    });
  }
});
app.get("/abc123", (req, res) => {
  console.log("ABC ROUTE HIT");
  res.send("HELLO");
});
app.get("/test-delete", (req, res) => {
  res.send("TEST DELETE WORKING");
});
app.delete("/delete-trip/:id", async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    // console.log(req.params);
    

    res.json({
      success: true,
      message: "Trip deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting trip",
    });
  }
});
const listEndpoints = require("express-list-endpoints");

console.log(listEndpoints(app));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});