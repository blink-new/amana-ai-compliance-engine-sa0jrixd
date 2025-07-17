import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Shield, 
  Upload, 
  FileText, 
  Image, 
  Music, 
  Video,
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ArrowLeft,
  Download,
  Eye,
  Clock,
  User,
  Flag,
  Settings,
  Bell,
  LogOut,
  Loader2,
  FileCheck,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ExternalLink,
  Filter,
  Search,
  Calendar,
  MoreVertical
} from 'lucide-react'

const blink = createClient({
  projectId: 'amana-ai-compliance-engine-sa0jrixd',
  authRequired: true
})

interface ReviewResult {
  id: string
  fileName: string
  fileType: string
  fileSize: string
  uploadedAt: string
  status: 'approved' | 'needs-review' | 'rejected'
  jurisdiction: string
  riskLevel: 'low' | 'medium' | 'high'
  flaggedIssues: Array<{
    type: 'shariah' | 'regulatory' | 'internal'
    severity: 'low' | 'medium' | 'high'
    text: string
    suggestion: string
    location: string
  }>
  summary: string
  confidence: number
  reviewedBy?: string
  reviewNotes?: string
}

const MarketingReview = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState<'upload' | 'results' | 'history'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('aaoifi')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentResult, setCurrentResult] = useState<ReviewResult | null>(null)
  const [reviewHistory, setReviewHistory] = useState<ReviewResult[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(state.isLoading)
      
      if (!state.user && !state.isLoading) {
        navigate('/auth')
      }
    })
    return unsubscribe
  }, [navigate])

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      setReviewHistory([
        {
          id: '1',
          fileName: 'Q4_Investment_Brochure.pdf',
          fileType: 'pdf',
          fileSize: '2.4 MB',
          uploadedAt: '2024-01-15T10:30:00Z',
          status: 'approved',
          jurisdiction: 'Malaysia (SC)',
          riskLevel: 'low',
          flaggedIssues: [],
          summary: 'Document fully compliant with Shariah and regulatory requirements.',
          confidence: 95,
          reviewedBy: 'AI Engine'
        },
        {
          id: '2',
          fileName: 'Sukuk_Marketing_Deck.pptx',
          fileType: 'pptx',
          fileSize: '5.1 MB',
          uploadedAt: '2024-01-14T14:20:00Z',
          status: 'needs-review',
          jurisdiction: 'UAE (DFSA)',
          riskLevel: 'medium',
          flaggedIssues: [
            {
              type: 'regulatory',
              severity: 'medium',
              text: 'projected returns of 8-12%',
              suggestion: 'Use "expected" instead of "projected" and add risk disclaimers',
              location: 'Slide 7, Performance Section'
            }
          ],
          summary: 'Minor regulatory language concerns requiring manual review.',
          confidence: 78,
          reviewedBy: 'AI Engine'
        },
        {
          id: '3',
          fileName: 'Takaful_Product_Guide.docx',
          fileType: 'docx',
          fileSize: '1.8 MB',
          uploadedAt: '2024-01-13T09:15:00Z',
          status: 'rejected',
          jurisdiction: 'Saudi Arabia (CMA)',
          riskLevel: 'high',
          flaggedIssues: [
            {
              type: 'shariah',
              severity: 'high',
              text: 'guaranteed fixed returns',
              suggestion: 'Remove guarantee language and use "expected profit sharing"',
              location: 'Page 3, Benefits Section'
            },
            {
              type: 'regulatory',
              severity: 'high',
              text: 'risk-free investment',
              suggestion: 'Add comprehensive risk disclosures',
              location: 'Page 1, Introduction'
            }
          ],
          summary: 'Multiple high-severity violations requiring complete revision.',
          confidence: 92,
          reviewedBy: 'AI Engine'
        }
      ])
    }
  }, [user])

  const handleSignOut = async () => {
    await blink.auth.logout('/')
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const simulateAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    // Simulate progress
    const progressSteps = [
      { progress: 20, message: 'Extracting text content...' },
      { progress: 40, message: 'Analyzing Shariah compliance...' },
      { progress: 60, message: 'Checking regulatory requirements...' },
      { progress: 80, message: 'Generating recommendations...' },
      { progress: 100, message: 'Analysis complete!' }
    ]
    
    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAnalysisProgress(step.progress)
    }
    
    // Mock result based on file name
    const mockResult: ReviewResult = {
      id: Date.now().toString(),
      fileName: selectedFile?.name || 'Unknown',
      fileType: selectedFile?.name.split('.').pop() || 'unknown',
      fileSize: `${(selectedFile?.size || 0 / 1024 / 1024).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString(),
      status: selectedFile?.name.toLowerCase().includes('compliant') ? 'approved' : 
              selectedFile?.name.toLowerCase().includes('review') ? 'needs-review' : 'rejected',
      jurisdiction: selectedJurisdiction,
      riskLevel: 'medium',
      flaggedIssues: [
        {
          type: 'shariah',
          severity: 'medium',
          text: 'interest-based returns',
          suggestion: 'Replace with "profit-sharing returns" or "Shariah-compliant returns"',
          location: 'Page 2, Investment Overview'
        },
        {
          type: 'regulatory',
          severity: 'low',
          text: 'guaranteed performance',
          suggestion: 'Add risk disclaimers and use "expected" instead of "guaranteed"',
          location: 'Page 4, Performance Section'
        }
      ],
      summary: 'Document contains moderate compliance issues that require attention before publication.',
      confidence: 85
    }
    
    setCurrentResult(mockResult)
    setReviewHistory(prev => [mockResult, ...prev])
    setIsAnalyzing(false)
    setCurrentView('results')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'needs-review': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'needs-review': return <AlertTriangle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />
      case 'pptx': case 'ppt': return <FileText className="w-8 h-8 text-orange-500" />
      case 'docx': case 'doc': return <FileText className="w-8 h-8 text-blue-500" />
      case 'jpg': case 'jpeg': case 'png': return <Image className="w-8 h-8 text-green-500" />
      case 'mp3': case 'wav': return <Music className="w-8 h-8 text-purple-500" />
      case 'mp4': case 'mov': return <Video className="w-8 h-8 text-indigo-500" />
      default: return <FileText className="w-8 h-8 text-gray-500" />
    }
  }

  const jurisdictions = [
    { value: 'aaoifi', label: 'AAOIFI (Global Standard)' },
    { value: 'malaysia', label: 'Malaysia (SC Malaysia, SAC BNM)' },
    { value: 'indonesia', label: 'Indonesia (DSN-MUI)' },
    { value: 'saudi', label: 'Saudi Arabia (CMA)' },
    { value: 'uae', label: 'UAE (DFSA, SCA)' },
    { value: 'qatar', label: 'Qatar (QFCRA)' },
    { value: 'bahrain', label: 'Bahrain (CBB)' },
    { value: 'oman', label: 'Oman (CMA)' },
    { value: 'pakistan', label: 'Pakistan (SECP)' }
  ]

  const filteredHistory = reviewHistory.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-primary">Amana AI</span>
              </div>
              <div className="hidden md:block">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <FileText className="w-3 h-3 mr-1" />
                  Marketing Review Module
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-gray-500">Compliance Officer</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as any)} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="results" disabled={!currentResult}>Results</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📄 Marketing Material Compliance Review
              </h1>
              <p className="text-gray-600">
                Upload marketing materials for automated Shariah and regulatory compliance analysis
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upload Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Document</CardTitle>
                    <CardDescription>
                      Supported formats: PDF, PowerPoint, Word, Images (JPG/PNG), Audio (MP3/WAV)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {selectedFile ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center">
                            {getFileIcon(selectedFile.name.split('.').pop() || '')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">
                              {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedFile(null)}
                          >
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-900">
                              Drop your file here, or{' '}
                              <button
                                type="button"
                                className="text-primary hover:text-primary/80"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                browse
                              </button>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              Maximum file size: 50MB
                            </p>
                          </div>
                          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <FileText className="w-4 h-4" />
                              <span>PDF, DOC, PPT</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Image className="w-4 h-4" />
                              <span>JPG, PNG</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Music className="w-4 h-4" />
                              <span>MP3, WAV</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.pptx,.ppt,.docx,.doc,.jpg,.jpeg,.png,.mp3,.wav,.mp4,.mov"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Progress */}
                {isAnalyzing && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          <span className="font-medium">Analyzing document...</span>
                        </div>
                        <Progress value={analysisProgress} className="w-full" />
                        <p className="text-sm text-gray-600">
                          {analysisProgress < 20 && 'Extracting text content...'}
                          {analysisProgress >= 20 && analysisProgress < 40 && 'Analyzing Shariah compliance...'}
                          {analysisProgress >= 40 && analysisProgress < 60 && 'Checking regulatory requirements...'}
                          {analysisProgress >= 60 && analysisProgress < 80 && 'Generating recommendations...'}
                          {analysisProgress >= 80 && 'Analysis complete!'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Configuration Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Jurisdiction
                      </label>
                      <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {jurisdictions.map((jurisdiction) => (
                            <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                              {jurisdiction.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="w-full" 
                      disabled={!selectedFile || isAnalyzing}
                      onClick={simulateAnalysis}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FileCheck className="w-4 h-4 mr-2" />
                          Start Analysis
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Notice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Files encrypted at rest and in transit</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>No data used for model training</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Full audit trail maintained</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {currentResult && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h1>
                    <p className="text-gray-600">Review compliance analysis for {currentResult.fileName}</p>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Escalate to Reviewer
                    </Button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Results Overview */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Status Banner */}
                    <Alert className={`border-l-4 ${
                      currentResult.status === 'approved' ? 'border-l-green-500 bg-green-50' :
                      currentResult.status === 'needs-review' ? 'border-l-yellow-500 bg-yellow-50' :
                      'border-l-red-500 bg-red-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(currentResult.status)}
                        <div>
                          <h3 className="font-semibold text-lg">
                            {currentResult.status === 'approved' && '✅ Document Approved'}
                            {currentResult.status === 'needs-review' && '⚠️ Needs Manual Review'}
                            {currentResult.status === 'rejected' && '❌ Document Rejected'}
                          </h3>
                          <AlertDescription className="mt-1">
                            {currentResult.summary}
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>

                    {/* Flagged Issues */}
                    {currentResult.flaggedIssues.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Flag className="w-5 h-5 text-red-500" />
                            <span>Flagged Issues ({currentResult.flaggedIssues.length})</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {currentResult.flaggedIssues.map((issue, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Badge className={
                                    issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                                    issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }>
                                    {issue.severity.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline">
                                    {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}
                                  </Badge>
                                </div>
                                <span className="text-xs text-gray-500">{issue.location}</span>
                              </div>
                              
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Flagged Text:</span>
                                  <p className="text-sm bg-red-50 p-2 rounded border-l-2 border-red-200 mt-1">
                                    "{issue.text}"
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Suggested Fix:</span>
                                  <p className="text-sm bg-green-50 p-2 rounded border-l-2 border-green-200 mt-1">
                                    {issue.suggestion}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {/* Document Preview Placeholder */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Eye className="w-5 h-5" />
                          <span>Document Preview</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                          {getFileIcon(currentResult.fileType)}
                          <p className="mt-4 text-gray-600">
                            Document preview would appear here
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            {currentResult.fileName} • {currentResult.fileSize}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Analysis Details Sidebar */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Analysis Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge className={getStatusColor(currentResult.status)}>
                            {currentResult.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Risk Level</span>
                          <span className={`text-sm font-medium ${getRiskColor(currentResult.riskLevel)}`}>
                            {currentResult.riskLevel.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Confidence</span>
                          <span className="text-sm font-medium">{currentResult.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Jurisdiction</span>
                          <span className="text-sm">{currentResult.jurisdiction}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Analyzed</span>
                          <span className="text-sm">
                            {new Date(currentResult.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Approve Document
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          Reject Document
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Add Review Notes
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Original
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Review History</h1>
                <p className="text-gray-600">Past compliance reviews and their outcomes</p>
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="border rounded-md px-3 py-1 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="needs-review">Needs Review</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700">Document</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-left p-4 font-medium text-gray-700">Risk Level</th>
                        <th className="text-left p-4 font-medium text-gray-700">Jurisdiction</th>
                        <th className="text-left p-4 font-medium text-gray-700">Date</th>
                        <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(item.fileType)}
                              <div>
                                <p className="font-medium text-gray-900">{item.fileName}</p>
                                <p className="text-sm text-gray-500">{item.fileSize}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(item.status)}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{item.status.replace('-', ' ')}</span>
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className={`font-medium ${getRiskColor(item.riskLevel)}`}>
                              {item.riskLevel.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{item.jurisdiction}</td>
                          <td className="p-4 text-sm text-gray-600">
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setCurrentResult(item)
                                  setCurrentView('results')
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default MarketingReview