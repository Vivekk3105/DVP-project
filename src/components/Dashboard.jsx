"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FolderPlus, List, Users, Building, FileText, Activity } from "lucide-react"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 12,
    activeProjects: 8,
    totalUsers: 25,
    totalClients: 15,
    recentScans: 45,
  })

  const quickActions = [
    {
      name: "Create Project",
      href: "/create-project",
      icon: FolderPlus,
      color: "bg-blue-500",
      description: "Start a new medical project",
    },
    {
      name: "Scan Report",
      href: "/diagnosis",
      icon: FileText,
      color: "bg-green-500",
      description: "Upload and analyze medical reports",
    },
    {
      name: "View Projects",
      href: "/projects",
      icon: List,
      color: "bg-purple-500",
      description: "Manage existing projects",
    },
    {
      name: "Manage Users",
      href: "/users",
      icon: Users,
      color: "bg-orange-500",
      description: "Add or edit system users",
    },
  ]

  const recentActivity = [
    { id: 1, action: "New project created", project: "Project Alpha", time: "2 hours ago" },
    { id: 2, action: "Medical report scanned", project: "Project Beta", time: "4 hours ago" },
    { id: 3, action: "DVP plan finalized", project: "Project Gamma", time: "6 hours ago" },
    { id: 4, action: "User assigned to project", project: "Project Epsilon", time: "8 hours ago" },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome to Medical Diagnosis System</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500">
                  <List className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalProjects}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
                  <Activity className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.activeProjects}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500">
                  <Building className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalClients}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Recent Scans</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.recentScans}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.name}
                    to={action.href}
                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className={`rounded-lg inline-flex p-3 ${action.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        <span className="absolute inset-0" />
                        {action.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">{action.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <Activity className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.action} in <span className="font-medium text-gray-900">{activity.project}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{activity.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
