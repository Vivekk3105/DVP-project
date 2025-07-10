import express from "express"
import Project from "../models/Project.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Get all projects
router.get("/", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find().populate("assignedUsers", "name email role")
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Create project
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { projectName, description, dvpCategory, subSystem, assignedUsers } = req.body

    const project = new Project({
      projectName,
      description,
      dvpCategory,
      subSystem,
      assignedUsers,
    })

    await project.save()
    await project.populate("assignedUsers", "name email role")

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update project
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { projectName, description, dvpCategory, subSystem, assignedUsers, status } = req.body

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { projectName, description, dvpCategory, subSystem, assignedUsers, status },
      { new: true },
    ).populate("assignedUsers", "name email role")

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete project
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json({ message: "Project deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
