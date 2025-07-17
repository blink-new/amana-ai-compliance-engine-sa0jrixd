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
  Globe
} from 'lucide-react'

// Mock data for reports
const mockReports = [
  {
    id: 'RPT001',
    name: 'Q4 2024 Purification Statement',
    type: 'Quarterly Statement',
    portfolios: 45,
    totalPurification: 1250000,
    generatedDate: '2024-01-15',
    status: 'completed',
    format: 'PDF',
    size: '2.4 MB',
    downloads: 12
  },
  {
    id: 'RPT002',
    name: 'Apple Inc. (AAPL) Detailed Analysis',
    type: 'Individual Security',
    portfolios: 1,
    totalPurification: 784,
    generatedDate: '2024-01-14',
    status: 'completed',
    format: 'Excel',
    size: '1.1 MB',
    downloads: 5
  },
  {
    id: 'RPT003',
    name: 'Technology Sector Purification Overview',
    type: 'Sector Analysis',
    portfolios: 23,
    totalPurification: 456000,
    generatedDate: '2024-01-13',
    status: 'processing',
    format: 'PDF',
    size: '3.2 MB',
    downloads: 0
  },
  {
    id: 'RPT004',
    name: 'Monthly Compliance Summary - December',
    type: 'Monthly Summary',
    portfolios: 67,
    totalPurification: 890000,
    generatedDate: '2024-01-01',
    status: 'completed',
    format: 'PDF',
    size: '1.8 MB',
    downloads: 28
  }
]

const PurificationReports = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [reportType, setReportType] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case 'processing':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800">
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
                         report.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = reportType === 'all' || report.type.toLowerCase().includes(reportType.toLowerCase())
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Generate New Report</span>
          </CardTitle>
          <CardDescription>
            Create comprehensive purification reports for audit trails and investor disclosure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quick" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick">Quick Report</TabsTrigger>
              <TabsTrigger value="custom">Custom Report</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Portfolio Summary</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Complete overview of all holdings and purification amounts
                    </p>
                    <Button size="sm" className="w-full">Generate</Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                      <PieChart className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Sector Analysis</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Purification breakdown by industry sectors
                    </p>
                    <Button size="sm" className="w-full">Generate</Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Trend Analysis</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Historical purification trends and patterns
                    </p>
                    <Button size="sm" className="w-full">Generate</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-type-select">Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portfolio">Portfolio Summary</SelectItem>
                        <SelectItem value="security">Individual Security</SelectItem>
                        <SelectItem value="sector">Sector Analysis</SelectItem>
                        <SelectItem value="compliance">Compliance Overview</SelectItem>
                        <SelectItem value="audit">Audit Trail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-from">Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="date-from" type="date" />
                      <Input id="date-to" type="date" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Output Format</Label>
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
                        <span>CSV Data</span>
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Custom Report
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4 mt-6">
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Reports</h3>
                <p className="text-gray-600 mb-6">
                  Set up automatic report generation for regular compliance reporting
                </p>
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Up Schedule
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Reports Library */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Archive className="w-5 h-5" />
                <span>Reports Library</span>
              </CardTitle>
              <CardDescription>
                Access and manage your generated purification reports
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="sector">Sector</SelectItem>
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
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded" />
                  </TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Portfolios</TableHead>
                  <TableHead>Total Purification</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Format</TableHead>
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
                        <p className="text-sm text-gray-500">ID: {report.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{report.portfolios}</span>
                      </div>
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
                      <div>
                        <p className="font-medium">{report.format}</p>
                        <p className="text-sm text-gray-500">{report.size}</p>
                      </div>
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

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">🔁 Auto-Send to Accounting</h3>
            <p className="text-sm text-gray-600 mb-4">
              Automatically send reports to your accounting team
            </p>
            <Button size="sm" variant="outline" className="w-full">Configure</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-3">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">📨 Notify Compliance Team</h3>
            <p className="text-sm text-gray-600 mb-4">
              Send notifications to compliance officers
            </p>
            <Button size="sm" variant="outline" className="w-full">Set Up</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-3">
              <Star className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">📥 Escalate to Shariah Committee</h3>
            <p className="text-sm text-gray-600 mb-4">
              Flag issues for Shariah board review
            </p>
            <Button size="sm" variant="outline" className="w-full">Configure</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PurificationReports