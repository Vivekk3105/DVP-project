"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search, Building } from "lucide-react"

const ClientManagement = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "MedTech Solutions",
      email: "contact@medtech.com",
      phone: "+1-555-0123",
      address: "123 Medical Ave, Health City",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Healthcare Innovations",
      email: "info@healthinnovations.com",
      phone: "+1-555-0124",
      address: "456 Innovation Blvd, Tech Town",
      status: "active",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Diagnostic Labs Inc",
      email: "admin@diaglabs.com",
      phone: "+1-555-0125",
      address: "789 Lab Street, Science Park",
      status: "inactive",
      createdAt: "2024-01-13",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  })

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingClient) {
      setClients(clients.map((client) => (client.id === editingClient.id ? { ...client, ...formData } : client)))
    } else {
      const newClient = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setClients([...clients, newClient])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", address: "", status: "active" })
    setEditingClient(null)
    setShowModal(false)
  }

  const handleEdit = (client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      status: client.status,
    })
    setShowModal(true)
  }

  const handleDelete = (clientId) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter((client) => client.id !== clientId))
    }
  }

  const getStatusColor = (status) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-2">Manage your medical clients and organizations</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="card-body">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="card">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        client.status
                      )}`}
                    >
                      {client.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(client)} className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {client.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {client.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {client.address}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created:</strong> {client.createdAt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new client.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingClient ? "Edit Client" : "Add New Client"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-field"
                    rows={3}
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingClient ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientManagement
