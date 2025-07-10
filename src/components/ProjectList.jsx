"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Eye, FileCheck, X } from "lucide-react"



const ProjectList = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project Alpha",
      dvpCategory: "IP and Console trims",
      status: "pending",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Project Beta",
      dvpCategory: "IP and Console trims",
      status: "pending",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Project Gamma",
      dvpCategory: "IP and Console trims",
      status: "pending",
      createdAt: "2024-01-13",
    },
    {
      id: 4,
      name: "Project Epsilon",
      dvpCategory: "IP and Console trims",
      status: "pending",
      createdAt: "2024-01-12",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({ name: "", dvpCategory: "", status: "pending" })

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.dvpCategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProjects(filtered)
  }, [searchTerm, projects])

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      dvpCategory: project.dvpCategory,
      status: project.status,
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updated = projects.map((p) =>
      p.id === editingProject.id ? { ...p, ...formData } : p
    )
    setProjects(updated)
    setShowModal(false)
    setEditingProject(null)
  }

  const handleGenerateDVP = (id) => alert(`Generating DVP for project ${id}`)
  const handleViewDVPPlan = (id) => alert(`Viewing DVP Plan for project ${id}`)
  const handleFinalisedDVP = (id) => alert(`Viewing Finalised DVP for project ${id}`)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project List</h1>
          <p className="text-gray-600 mt-2">Manage your medical diagnosis projects</p>
        </div>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Type to search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Project Name", "DVP Category", "Status", "Generate DVP", "View DVP Plan", "Finalised DVP", "Action"].map((title) => (
                  <th key={title} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{project.name}</td>
                  <td className="px-6 py-4">{project.dvpCategory}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleGenerateDVP(project.id)} className="text-primary-600 hover:text-primary-900">
                      <Plus className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleViewDVPPlan(project.id)} className="text-green-600 hover:text-green-900">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleFinalisedDVP(project.id)} className="text-blue-600 hover:text-blue-900">
                      <FileCheck className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button onClick={() => handleEdit(project)} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found matching your search.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Edit Project</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DVP Category</label>
                <input
                  type="text"
                  value={formData.dvpCategory}
                  onChange={(e) => setFormData({ ...formData, dvpCategory: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-field"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectList
