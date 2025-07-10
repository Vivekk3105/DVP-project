import mongoose from "mongoose"
import User from "./models/User.js"
import Client from "./models/Client.js"
import Project from "./models/Project.js"
import dotenv from "dotenv"

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/medical-diagnosis")

    // Clear existing data
    await User.deleteMany({})
    await Client.deleteMany({})
    await Project.deleteMany({})

    // Create admin user
    const adminUser = new User({
      name: "System Administrator",
      email: "admin@medical.com",
      password: "admin123",
      role: "System Lead",
      status: "active",
    })
    await adminUser.save()

    // Create sample users
    const users = [
      {
        name: "John Doe",
        email: "john@medical.com",
        password: "password123",
        role: "System Engineer",
        status: "active",
      },
      {
        name: "Jane Smith",
        email: "jane@medical.com",
        password: "password123",
        role: "System User",
        status: "active",
      },
      {
        name: "Mike Johnson",
        email: "mike@medical.com",
        password: "password123",
        role: "Project Manager",
        status: "active",
      },
    ]

    const createdUsers = await User.insertMany(users)

    // Create sample clients
    const clients = [
      {
        name: "MedTech Solutions",
        email: "contact@medtech.com",
        phone: "+1-555-0123",
        address: "123 Medical Ave, Health City",
        status: "active",
      },
      {
        name: "Healthcare Innovations",
        email: "info@healthinnovations.com",
        phone: "+1-555-0124",
        address: "456 Innovation Blvd, Tech Town",
        status: "active",
      },
    ]

    await Client.insertMany(clients)

    // Create sample projects
    const projects = [
      {
        projectName: "Project Alpha",
        description: "Medical diagnosis system for cardiovascular diseases",
        dvpCategory: "IP and Console trims",
        subSystem: "IP",
        assignedUsers: [createdUsers[0]._id, createdUsers[1]._id],
        status: "pending",
      },
      {
        projectName: "Project Beta",
        description: "AI-powered diagnostic tool for respiratory conditions",
        dvpCategory: "IP and Console trims",
        subSystem: "Fr Console",
        assignedUsers: [createdUsers[1]._id, createdUsers[2]._id],
        status: "active",
      },
    ]

    await Project.insertMany(projects)

    console.log("Seed data created successfully!")
    console.log("Admin credentials: admin@medical.com / admin123")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
