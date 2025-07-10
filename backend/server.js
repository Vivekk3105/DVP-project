import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import projectRoutes from "./routes/projects.js"
import userRoutes from "./routes/users.js"
import clientRoutes from "./routes/clients.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/users", userRoutes)
app.use("/api/clients", clientRoutes)

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/medical-diagnosis", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Medical Diagnosis System API" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
