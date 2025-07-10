"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Upload, X } from "lucide-react"



const CreateProject = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    dvpCategory: "",
    subSystem: "",
    assignedUsers: [""],
    documents: [],
  })

  const dvpCategories = ["Exterior trims", "IP and Console trims", "Interior Trims"]

  const subSystems = {
    "IP and Console trims": ["IP", "Fr Console", "Rr Console"],
    "Exterior trims": ["Front Bumper", "Rear Bumper", "Side Panels"],
    "Interior Trims": ["Dashboard", "Door Panels", "Seat Covers"],
  }

  const users = ["System Engineer", "System User", "System Lead", "Project Manager", "Quality Analyst"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUserChange = (index, value) => {
    const newUsers = [...formData.assignedUsers]
    newUsers[index] = value
    setFormData((prev) => ({
      ...prev,
      assignedUsers: newUsers,
    }))
  }

  const addUser = () => {
    setFormData((prev) => ({
      ...prev,
      assignedUsers: [...prev.assignedUsers, ""],
    }))
  }

  const removeUser = (index) => {
    const newUsers = formData.assignedUsers.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      assignedUsers: newUsers,
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }))
  }

  const removeDocument = (index) => {
    const newDocs = formData.documents.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      documents: newDocs,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Project data:", formData)
    alert("Project created successfully!")
    navigate("/projects")
  }

  const handleReset = () => {
    setFormData({
      projectName: "",
      description: "",
      dvpCategory: "",
      subSystem: "",
      assignedUsers: [""],
      documents: [],
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Project</h1>
        <p className="text-gray-600 mt-2">Create a new medical diagnosis project</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Project Info */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">DVP Category *</label>
                <select
                  name="dvpCategory"
                  value={formData.dvpCategory}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a category</option>
                  {dvpCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="input-field"
                placeholder="Add any comments here..."
              />
            </div>

            {formData.dvpCategory && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub System *</label>
                <select
                  name="subSystem"
                  value={formData.subSystem}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a sub-system</option>
                  {subSystems[formData.dvpCategory]?.map((system) => (
                    <option key={system} value={system}>
                      {system}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Assign Users */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Users</h2>

            {formData.assignedUsers.map((user, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mb-3">
                <select
                  value={user}
                  onChange={(e) => handleUserChange(index, e.target.value)}
                  className="input-field flex-1"
                >
                  <option value="">Select a user</option>
                  {users.map((userOption) => (
                    <option key={userOption} value={userOption}>
                      {userOption}
                    </option>
                  ))}
                </select>
                {formData.assignedUsers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUser(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addUser}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Another User
            </button>
          </div>
        </div>

        {/* Upload Documents */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Documents</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <label
                htmlFor="file-upload"
                className="mt-2 block text-sm font-medium text-blue-700 cursor-pointer hover:underline"
              >
                Upload Documents for reference
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {formData.documents.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit/Reset */}
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <button type="button" onClick={handleReset} className="btn-secondary w-full sm:w-auto">
            Reset
          </button>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Create Project
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProject
