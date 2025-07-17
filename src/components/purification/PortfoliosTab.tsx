import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  Download,
  RefreshCw,
  Building,
  Calendar,
  Percent,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Upload,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'

// Mock portfolio data
const mockPortfolios = [
  {
    id: 'PF001',
    name: 'Global Equity Fund',
    clientName: 'Al-Rajhi Capital',
    complianceStandard: 'AAOIFI',
    securities: 156,
    percentPurified: 3.2,
    lastReviewDate: '2024-01-15',
    complianceScore: 94.2,
    status: 'compliant',
    totalValue: 125000000,
    purificationAmount: 4000000
  },
  {
    id: 'PF002',
    name: 'Technology Sector Fund',
    clientName: 'Dubai Islamic Bank',
    complianceStandard: 'Malaysia SC',
    securities: 89,
    percentPurified: 5.8,
    lastReviewDate: '2024-01-14',
    complianceScore: 87.5,
    status: 'warning',
    totalValue: 78000000,
    purificationAmount: 4524000
  },
  {
    id: 'PF003',
    name: 'Emerging Markets Fund',
    clientName: 'Kuwait Finance House',
    complianceStandard: 'AAOIFI',
    securities: 234,
    percentPurified: 2.1,
    lastReviewDate: '2024-01-13',
    complianceScore: 96.8,
    status: 'compliant',
    totalValue: 95000000,
    purificationAmount: 1995000
  },
  {
    id: 'PF004',
    name: 'Healthcare Innovation Fund',
    clientName: 'Maybank Islamic',
    complianceStandard: 'Malaysia SC',
    securities: 67,
    percentPurified: 8.2,
    lastReviewDate: '2024-01-12',
    complianceScore: 78.3,
    status: 'needs_review',
    totalValue: 45000000,
    purificationAmount: 3690000
  },
  {
    id: 'PF005',
    name: 'Sustainable Energy Fund',
    clientName: 'Bank Islam Malaysia',
    complianceStandard: 'Indonesia OJK',
    securities: 43,
    percentPurified: 1.8,
    lastReviewDate: '2024-01-11',
    complianceScore: 98.1,
    status: 'compliant',
    totalValue: 32000000,
    purificationAmount: 576000
  }
]

const PortfoliosTab = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [standardFilter, setStandardFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Compliant
          </Badge>
        )
      case 'warning':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
        )
      case 'needs_review':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <Clock className="w-3 h-3 mr-1" />
            Needs Review
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getComplianceScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600'
    if (score >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredPortfolios = mockPortfolios.filter(portfolio => {
    const matchesSearch = portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStandard = standardFilter === 'all' || portfolio.complianceStandard === standardFilter
    const matchesStatus = statusFilter === 'all' || portfolio.status === statusFilter
    return matchesSearch && matchesStandard && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-blue-900">📂 Portfolio Management</CardTitle>
              <CardDescription className="text-blue-700">
                Manage all uploaded portfolios with compliance tracking and purification monitoring
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Upload New Portfolio
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search portfolios or clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={standardFilter} onValueChange={setStandardFilter}>
                <SelectTrigger className="w-48">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Compliance Standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Standards</SelectItem>
                  <SelectItem value="AAOIFI">AAOIFI</SelectItem>
                  <SelectItem value="Malaysia SC">Malaysia SC</SelectItem>
                  <SelectItem value="Indonesia OJK">Indonesia OJK</SelectItem>
                  <SelectItem value="Saudi Tadawul">Saudi Tadawul</SelectItem>
                  <SelectItem value="UAE SCA">UAE SCA</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="needs_review">Needs Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolios</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPortfolios.length}</p>
                <p className="text-sm text-blue-600">Active portfolios</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total AUM</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(filteredPortfolios.reduce((sum, p) => sum + p.totalValue, 0) / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-green-600">Assets under management</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Purification</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(filteredPortfolios.reduce((sum, p) => sum + p.percentPurified, 0) / filteredPortfolios.length).toFixed(1)}%
                </p>
                <p className="text-sm text-purple-600">Average across portfolios</p>
              </div>
              <Percent className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Clients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(filteredPortfolios.map(p => p.clientName)).size}
                </p>
                <p className="text-sm text-indigo-600">Active clients</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Portfolio Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Overview</CardTitle>
              <CardDescription>
                Complete list of all portfolios with compliance status and purification details
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
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
                  <TableHead>Portfolio Name</TableHead>
                  <TableHead>Client/Fund Name</TableHead>
                  <TableHead>Compliance Standard</TableHead>
                  <TableHead># Securities</TableHead>
                  <TableHead>% Purified</TableHead>
                  <TableHead>Last Review</TableHead>
                  <TableHead>Compliance Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPortfolios.map((portfolio) => (
                  <TableRow key={portfolio.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedPortfolios.includes(portfolio.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPortfolios([...selectedPortfolios, portfolio.id])
                          } else {
                            setSelectedPortfolios(selectedPortfolios.filter(id => id !== portfolio.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{portfolio.name}</p>
                        <p className="text-sm text-gray-500">ID: {portfolio.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">{portfolio.clientName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-200 text-blue-800">
                        {portfolio.complianceStandard}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{portfolio.securities}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge 
                          variant="outline" 
                          className={
                            portfolio.percentPurified > 5 
                              ? 'border-red-200 text-red-800' 
                              : portfolio.percentPurified > 3 
                              ? 'border-yellow-200 text-yellow-800'
                              : 'border-green-200 text-green-800'
                          }
                        >
                          {portfolio.percentPurified}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {new Date(portfolio.lastReviewDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={`font-bold ${getComplianceScoreColor(portfolio.complianceScore)}`}>
                          {portfolio.complianceScore}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(portfolio.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit Portfolio">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="More Options">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPortfolios.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No portfolios found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload Your First Portfolio
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedPortfolios.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="font-medium text-blue-900">
                  {selectedPortfolios.length} portfolio{selectedPortfolios.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh All
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Selected
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setSelectedPortfolios([])}
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PortfoliosTab