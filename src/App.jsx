"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import ProjectList from "./components/ProjectList"
import CreateProject from "./components/CreateProject"
import UserManagement from "./components/UserManagement"
import ClientManagement from "./components/ClientManagement"
import DiagnosisScanner from "./components/DiagnosisScanner"
import Layout from "./components/Layout"

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProjectList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-project"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateProject />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClientManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/diagnosis"
            element={
              <ProtectedRoute>
                <Layout>
                  <DiagnosisScanner />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
