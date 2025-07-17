import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Upload,
  FileText,
  Link2,
  CheckCircle,
  AlertTriangle,
  X,
  Download,
  Settings,
  HelpCircle,
  Database,
  Cloud,
  FileSpreadsheet,
  Calendar,
  DollarSign,
  Building,
  Globe,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react'

const PortfolioUpload = () => {
  const [uploadMethod, setUploadMethod] = useState('file')
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [shariahStandard, setShariahStandard] = useState('aaoifi')
  const [jurisdictionOverlay, setJurisdictionOverlay] = useState('')
  const [autoCalculate, setAutoCalculate] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setIsUploading(true)
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    // Here you would typically process the files and redirect to calculation
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'csv':
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />
      default:
        return <FileText className="w-5 h-5 text-blue-600" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Upload Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Portfolio Input Method</span>
          </CardTitle>
          <CardDescription>
            Choose how you want to provide your portfolio data for purification analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={uploadMethod} onValueChange={setUploadMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="file" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>📁 Upload Portfolio</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center space-x-2">
                <Link2 className="w-4 h-4" />
                <span>🔗 Connect via API</span>
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>✏️ Manual Entry</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="space-y-6 mt-6">
              {/* File Upload Area */}
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
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Drop your portfolio files here
                    </h3>
                    <p className="text-gray-600 mb-4">
                      or click to browse and select files
                    </p>
                    
                    <input
                      type="file"
                      multiple
                      accept=".csv,.xlsx,.xls,.pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Select Files
                      </Button>
                    </label>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Supported formats: CSV, XLSX, XLS, PDF</p>
                    <p>Maximum file size: 50MB per file</p>
                  </div>
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Uploaded Files ({uploadedFiles.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.name)}
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ready
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sample Template */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Download className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">Need a template?</h4>
                        <p className="text-sm text-blue-700">
                          Download our CSV template with required columns and sample data
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Popular Integrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Integrations</CardTitle>
                    <CardDescription>Connect directly to your portfolio management system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: 'Bloomberg Terminal', icon: Database, status: 'Available' },
                      { name: 'Refinitiv Eikon', icon: Globe, status: 'Available' },
                      { name: 'Charles River IMS', icon: Building, status: 'Coming Soon' },
                      { name: 'Aladdin BlackRock', icon: Shield, status: 'Available' }
                    ].map((integration, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <integration.icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{integration.name}</span>
                        </div>
                        <Badge 
                          variant={integration.status === 'Available' ? 'default' : 'secondary'}
                          className={integration.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {integration.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* API Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">API Configuration</CardTitle>
                    <CardDescription>Set up your API connection parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input 
                        id="api-endpoint" 
                        placeholder="https://api.yourpms.com/portfolios"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input 
                        id="api-key" 
                        type="password"
                        placeholder="Enter your API key"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-id">Portfolio ID</Label>
                      <Input 
                        id="portfolio-id" 
                        placeholder="Portfolio identifier"
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Link2 className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Manual Portfolio Entry</CardTitle>
                  <CardDescription>Enter your portfolio holdings manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticker">Ticker Symbol</Label>
                      <Input id="ticker" placeholder="e.g., AAPL" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" placeholder="Number of shares" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="purchase-date">Purchase Date</Label>
                      <Input id="purchase-date" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sale-date">Sale Date (Optional)</Label>
                      <Input id="sale-date" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dividends">Dividends Received</Label>
                      <Input id="dividends" type="number" placeholder="0.00" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="capital-gains">Capital Gains</Label>
                      <Input id="capital-gains" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Add Another Holding
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Shariah Standards Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Shariah Standards Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure the Shariah compliance standards and calculation methodology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shariah-standard">Primary Shariah Standard</Label>
                <Select value={shariahStandard} onValueChange={setShariahStandard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aaoifi">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>AAOIFI (Default)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="malaysia">Malaysia SC</SelectItem>
                    <SelectItem value="indonesia">Indonesia OJK</SelectItem>
                    <SelectItem value="saudi">Saudi Tadawul</SelectItem>
                    <SelectItem value="pakistan">Pakistan SECP</SelectItem>
                    <SelectItem value="uae">UAE SCA</SelectItem>
                    <SelectItem value="qatar">Qatar QFCRA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jurisdiction-overlay">Jurisdiction Overlay (Optional)</Label>
                <Select value={jurisdictionOverlay} onValueChange={setJurisdictionOverlay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select overlay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="malaysia">Malaysia (SC Malaysia, SAC BNM)</SelectItem>
                    <SelectItem value="indonesia">Indonesia (DSN-MUI)</SelectItem>
                    <SelectItem value="gcc">GCC Countries</SelectItem>
                    <SelectItem value="custom">Custom Thresholds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-calculate">Auto-Calculate Purification</Label>
                  <p className="text-sm text-gray-500">
                    Automatically calculate purification amounts upon upload
                  </p>
                </div>
                <Switch
                  id="auto-calculate"
                  checked={autoCalculate}
                  onCheckedChange={setAutoCalculate}
                />
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Standard Differences</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Overlay standards may show different screening results. All differences will be clearly indicated in the output.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline">
          <HelpCircle className="w-4 h-4 mr-2" />
          View Documentation
        </Button>

        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Form
          </Button>
          
          <Button 
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0 || isUploading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Start Analysis
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PortfolioUpload