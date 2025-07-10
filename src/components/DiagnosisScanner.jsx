"use client"

import { useState } from "react"
import { Upload, FileText, Brain, Download, Eye, Clock } from "lucide-react"

const DiagnosisScanner = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type.includes("image") || file.type.includes("pdf")) {
      setUploadedFile(file)
      setAnalysisResult(null)
    } else {
      alert("Please upload an image or PDF file")
    }
  }

  const analyzeReport = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        diagnosis: "Hypertension (High Blood Pressure)",
        confidence: 92,
        recommendations: [
          "Monitor blood pressure regularly",
          "Reduce sodium intake",
          "Increase physical activity",
          "Consider medication consultation with physician",
        ],
        riskFactors: [
          "Elevated systolic pressure (>140 mmHg)",
          "Family history of cardiovascular disease",
          "Sedentary lifestyle indicators",
        ],
        followUp: "Schedule follow-up appointment within 2-4 weeks",
        severity: "Moderate",
        additionalTests: ["Lipid profile", "HbA1c test", "Kidney function tests"],
      }

      setAnalysisResult(mockResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const downloadReport = () => {
    if (!analysisResult) return

    const reportData = JSON.stringify(analysisResult, null, 2)
    const blob = new Blob([reportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "diagnosis-report.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Medical Report Scanner</h1>
        <p className="mt-2 text-sm text-gray-600">Upload medical reports for AI-powered diagnosis analysis</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Medical Report</h2>

            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf"
                      onChange={handleFileInput}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>

            {uploadedFile && (
              <div className="mt-4">
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={analyzeReport}
                  disabled={isAnalyzing}
                  className="mt-4 w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Report
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Analysis Results</h2>

            {!analysisResult && !isAnalyzing && (
              <div className="text-center py-12">
                <Brain className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No analysis yet</h3>
                <p className="mt-1 text-sm text-gray-500">Upload a medical report to see analysis results</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Analyzing your report...</h3>
                <p className="mt-1 text-sm text-gray-500">This may take a few moments</p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                {/* Primary Diagnosis */}
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-blue-800">Primary Diagnosis</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p className="font-semibold">{analysisResult.diagnosis}</p>
                        <p className="mt-1">Confidence: {analysisResult.confidence}%</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getSeverityColor(analysisResult.severity)}`}
                        >
                          {analysisResult.severity} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex">
                        <div className="flex-shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                        <p className="ml-3 text-sm text-gray-700">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Factors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Risk Factors</h3>
                  <ul className="space-y-2">
                    {analysisResult.riskFactors.map((risk, index) => (
                      <li key={index} className="flex">
                        <div className="flex-shrink-0 w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                        <p className="ml-3 text-sm text-gray-700">{risk}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Tests */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Suggested Additional Tests</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.additionalTests.map((test, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Follow-up */}
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Follow-up Required</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>{analysisResult.followUp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button onClick={downloadReport} className="btn-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </button>
                  <button className="btn-secondary">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="mt-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Scans</h2>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">blood_test_report.pdf</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Hypertension</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">92%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                      <button className="text-green-600 hover:text-green-900">Download</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">xray_chest.jpg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Normal</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">98%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-14</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                      <button className="text-green-600 hover:text-green-900">Download</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiagnosisScanner
