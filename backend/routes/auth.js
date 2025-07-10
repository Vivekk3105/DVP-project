import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check if user is active
    if (user.status !== "active") {
      return res.status(401).json({ message: "Account is inactive" })
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "7d" })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get current user
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    res.json({ user })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
