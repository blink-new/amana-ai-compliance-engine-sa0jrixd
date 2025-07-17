import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Share,
  Mail,
  Printer,
  RefreshCw,
  Settings,
  Archive,
  Star,
  Users,
  Globe,
  Plus,
  Zap,
  Shield,
  FileCheck,
  History,
  Bell,
  Send
} from 'lucide-react'

// Mock reports data
const mockReports = [
  {
    id: 'RPT001',
    name: 'Q4 2024 Purification Ledger',
    type: 'Purification Ledger',
    portfolios: 45,
    totalPurification: 1250000,
    generatedDate: '2024-01-15',
    status: 'completed',
    format: 'PDF',
    size: '2.4 MB',
    downloads: 12,
    client: 'Al-Rajhi Capital',
    standard: 'AAOIFI'
  },
  {
    id: 'RPT002',
    name: 'Client Disclosure Statement - DIB',
    type: 'Client Disclosure',
    portfolios: 23,
    totalPurification: 456000,
    generatedDate: '2024-01-14',
    status: 'completed',
    format: 'PDF',
    size: '1.8 MB',
    downloads: 8,
    client: 'Dubai Islamic Bank',
    standard: 'Malaysia SC'
  },
  {
    id: 'RPT003',
    name: 'Zakat Purification Summary - KFH',
    type: 'Zakat Summary',
    portfolios: 67,
    totalPurification: 890000,
    generatedDate: '2024-01-13',
    status: 'processing',
    format: 'Excel',
    size: '3.2 MB',
    downloads: 0,
    client: 'Kuwait Finance House',
    standard: 'AAOIFI'
  },
  {
    id: 'RPT004',
    name: 'Monthly Compliance Audit Trail',
    type: 'Audit Trail',
    portfolios: 156,
    totalPurification: 2100000,
    generatedDate: '2024-01-12',
    status: 'completed',
    format: 'PDF',
    size: '5.1 MB',
    downloads: 28,
    client: 'Multiple Clients',
    standard: 'AAOIFI'
  }
]

// Mock audit log data
const mockAuditLog = [
  {
    id: 'AUD001',
    timestamp: '2024-01-15T10:30:00',
    user: 'ahmad.hassan@alrajhi.com',
    action: 'Manual Override Applied',
    entity: 'AAPL - Apple Inc.',
    details: 'Adjusted non-compliant percentage from 3.2% to 2.8%',
    reason: 'Updated financial statement analysis',
    impact: '$125.50 reduction in purification'
  },
  {
    id: 'AUD002',
    timestamp: '2024-01-15T09:15:00',
    user: 'fatima.ali@dib.ae',
    action: 'Calculation Approved',
    entity: 'Technology Sector Fund',
    details: 'Approved purification calculations for 89 securities',
    reason: 'Compliance review completed',
    impact: '$456,000 total purification approved'
  },
  {
    id: 'AUD003',
    timestamp: '2024-01-14T16:45:00',
    user: 'system@amana.ai',
    action: 'Automated Recalculation',
    entity: 'Global Equity Fund',
    details: 'Recalculated purification due to standard change',
    reason: 'AAOIFI to Malaysia SC overlay applied',
    impact: '12% increase in purification amounts'
  }
]

const ReportsAuditTab = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [reportType, setReportType] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [activeSubTab, setActiveSubTab] = useState('generate')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case 'processing':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = reportType === 'all' || report.type === reportType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-green-900">📄 Reports & Audit</CardTitle>
              <CardDescription className="text-green-700">
                Generate comprehensive reports and maintain full audit trails for regulatory compliance
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Report Settings
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Sub-tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-1">
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger 
              value="generate" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
            >
              <Zap className="w-4 h-4" />
              <span>Generate Reports</span>
            </TabsTrigger>
            <TabsTrigger 
              value="library" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Archive className="w-4 h-4" />
              <span>Reports Library</span>
            </TabsTrigger>
            <TabsTrigger 
              value="audit" 
              className="flex items-center space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              <History className="w-4 h-4" />
              <span>Audit Trail</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Generate Reports Tab */}
        <TabsContent value="generate" className="space-y-6">
          {/* Quick Report Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Quick Report Generation</span>
              </CardTitle>
              <CardDescription>
                Generate standard reports with pre-configured templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">📋 Purification Ledger</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Complete CSV/PDF ledger with all purification calculations and audit trail
                    </p>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Generate Ledger
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">📄 Client Disclosure</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Professional disclosure statement for client reporting and transparency
                    </p>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Generate Statement
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-purple-300">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
                      <Star className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">🕌 Zakat Summary</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Zakat and purification summary with Islamic jurisprudence references
                    </p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Generate Summary
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Custom Report Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Custom Report Builder</span>
              </CardTitle>
              <CardDescription>
                Build custom reports with specific parameters and formatting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter custom report name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-type-select">Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purification_ledger">Purification Ledger</SelectItem>
                        <SelectItem value="client_disclosure">Client Disclosure Statement</SelectItem>
                        <SelectItem value="zakat_summary">Zakat Purification Summary</SelectItem>
                        <SelectItem value="audit_trail">Audit Trail Report</SelectItem>
                        <SelectItem value="compliance_overview">Compliance Overview</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-filter">Client Filter</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Clients</SelectItem>
                        <SelectItem value="alrajhi">Al-Rajhi Capital</SelectItem>
                        <SelectItem value="dib">Dubai Islamic Bank</SelectItem>
                        <SelectItem value="kfh">Kuwait Finance House</SelectItem>
                        <SelectItem value="maybank">Maybank Islamic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Output Formats</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>PDF Report</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Excel Spreadsheet</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>CSV Data Export</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Include Sections</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Executive Summary</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Detailed Calculations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Audit Trail</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Methodology Notes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Shariah Compliance Certificate</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shariah-standard">Shariah Standard</Label>
                    <Select>
                      <SelectTrigger>
                        <Shield className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Select standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aaoifi">AAOIFI</SelectItem>
                        <SelectItem value="malaysia">Malaysia SC</SelectItem>
                        <SelectItem value="indonesia">Indonesia OJK</SelectItem>
                        <SelectItem value="saudi">Saudi Tadawul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-green-600 hover:bg-green-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Automated Reporting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Automated Reporting</span>
              </CardTitle>
              <CardDescription>
                Set up scheduled reports and automated distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                      <Send className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">📧 Auto-Send to Accounting</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Automatically send monthly reports to accounting team
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Configure</Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-3">
                      <Users className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold mb-2">📨 Notify Compliance Team</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Send notifications to compliance officers for review
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Set Up</Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-3">
                      <Star className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">📥 Escalate to Shariah Board</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Flag critical issues for Shariah committee review
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Configure</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Library Tab */}
        <TabsContent value="library" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-1 items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Purification Ledger">Purification Ledger</SelectItem>
                      <SelectItem value="Client Disclosure">Client Disclosure</SelectItem>
                      <SelectItem value="Zakat Summary">Zakat Summary</SelectItem>
                      <SelectItem value="Audit Trail">Audit Trail</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-40">
                      <Calendar className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>
                    Access and manage your generated purification reports
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input type="checkbox" className="rounded" />
                      </TableHead>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Portfolios</TableHead>
                      <TableHead>Total Purification</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-gray-50">
                        <TableCell>
                          <input 
                            type="checkbox" 
                            className="rounded"
                            checked={selectedReports.includes(report.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedReports([...selectedReports, report.id])
                              } else {
                                setSelectedReports(selectedReports.filter(id => id !== report.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{report.name}</p>
                            <p className="text-sm text-gray-500">
                              {report.format} • {report.size}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-blue-200 text-blue-800">
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{report.client}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{report.portfolios}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1 text-red-600" />
                            <span className="font-medium text-red-600">
                              ${report.totalPurification.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {new Date(report.generatedDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(report.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1 text-gray-400" />
                            <span>{report.downloads}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" title="View Report">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Download">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Share">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedReports.length > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <p className="font-medium text-blue-900">
                      {selectedReports.length} report{selectedReports.length > 1 ? 's' : ''} selected
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Reports
                      </Button>
                      <Button size="sm" variant="outline">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setSelectedReports([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Audit Trail</span>
              </CardTitle>
              <CardDescription>
                Complete log of all actions, calculations, and overrides with full traceability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAuditLog.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge 
                            variant="outline" 
                            className={
                              entry.action.includes('Override') ? 'border-orange-200 text-orange-800' :
                              entry.action.includes('Approved') ? 'border-green-200 text-green-800' :
                              'border-blue-200 text-blue-800'
                            }
                          >
                            {entry.action}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="mb-2">
                          <p className="font-medium text-gray-900">{entry.entity}</p>
                          <p className="text-sm text-gray-600">{entry.details}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">User: </span>
                            <span className="font-medium">{entry.user}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Impact: </span>
                            <span className="font-medium">{entry.impact}</span>
                          </div>
                        </div>
                        
                        {entry.reason && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <span className="text-gray-500">Reason: </span>
                            <span>{entry.reason}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">
                  Load More Entries
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ReportsAuditTab