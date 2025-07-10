import express from "express"
import Client from "../models/Client.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Get all clients
router.get("/", authenticateToken, async (req, res) => {
  try {
    const clients = await Client.find()
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Create client
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, address, status } = req.body

    const client = new Client({
      name,
      email,
      phone,
      address,
      status,
    })

    await client.save()
    res.status(201).json(client)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update client
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, address, status } = req.body

    const client = await Client.findByIdAndUpdate(req.params.id, { name, email, phone, address, status }, { new: true })

    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    res.json(client)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete client
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id)

    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    res.json({ message: "Client deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
