import express from "express"
import User from "../models/User.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Get all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Create user
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, email, role, status } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({
      name,
      email,
      password: "defaultPassword123", // In production, generate random password
      role,
      status,
    })

    await user.save()

    const userResponse = user.toObject()
    delete userResponse.password

    res.status(201).json(userResponse)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update user
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { name, email, role, status } = req.body

    const user = await User.findByIdAndUpdate(req.params.id, { name, email, role, status }, { new: true }).select(
      "-password",
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete user
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
