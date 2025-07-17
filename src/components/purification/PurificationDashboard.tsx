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
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  HelpCircle,
  Calendar,
  Building,
  Percent,
  FileText
} from 'lucide-react'

// Mock data for demonstration
const mockPortfolios = [
  {
    id: 'PF001',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    holdingPeriod: '2023-01-15 - 2024-01-15',
    dividendReceived: 2450.00,
    nonCompliantIncome: 3.2,
    capitalGain: 15000.00,
    purificationDue: 784.00,
    flagTrigger: 'Interest income breach',
    status: 'approved',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'PF002',
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    holdingPeriod: '2023-03-10 - Current',
    dividendReceived: 1850.00,
    nonCompliantIncome: 2.1,
    capitalGain: 8500.00,
    purificationDue: 217.85,
    flagTrigger: 'Crypto subsidiary',
    status: 'pending',
    lastUpdated: '1 day ago'
  },
  {
    id: 'PF003',
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    holdingPeriod: '2023-06-20 - 2024-06-20',
    dividendReceived: 0.00,
    nonCompliantIncome: 1.8,
    capitalGain: 12000.00,
    purificationDue: 216.00,
    flagTrigger: 'Ad revenue concerns',
    status: 'needs_review',
    lastUpdated: '3 hours ago'
  },
  {
    id: 'PF004',
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    holdingPeriod: '2023-02-01 - Current',
    dividendReceived: 0.00,
    nonCompliantIncome: 0.5,
    capitalGain: 25000.00,
    purificationDue: 125.00,
    flagTrigger: 'Minor interest income',
    status: 'approved',
    lastUpdated: '5 hours ago'
  },
  {
    id: 'PF005',
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    holdingPeriod: '2023-04-15 - Current',
    dividendReceived: 0.00,
    nonCompliantIncome: 4.1,
    capitalGain: 18000.00,
    purificationDue: 738.00,
    flagTrigger: 'AWS interest income',
    status: 'needs_review',
    lastUpdated: '1 day ago'
  }
]

const PurificationDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case 'needs_review':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Needs Review
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPortfolios = mockPortfolios.filter(portfolio => {
    const matchesSearch = portfolio.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || portfolio.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPurification = filteredPortfolios.reduce((sum, p) => sum + p.purificationDue, 0)

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by ticker or company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Holdings</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPortfolios.length}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Purification Due</p>
                <p className="text-2xl font-bold text-gray-900">${totalPurification.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Non-Compliant %</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(filteredPortfolios.reduce((sum, p) => sum + p.nonCompliantIncome, 0) / filteredPortfolios.length).toFixed(1)}%
                </p>
              </div>
              <Percent className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Portfolio Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Holdings</CardTitle>
              <CardDescription>
                Detailed view of all holdings and their purification requirements
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Column Guide
            </Button>
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
                  <TableHead>Ticker</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Holding Period</TableHead>
                  <TableHead>Dividend Received</TableHead>
                  <TableHead>Non-Compliant %</TableHead>
                  <TableHead>Capital Gain</TableHead>
                  <TableHead>🧮 Purification Due</TableHead>
                  <TableHead>⚠️ Flag Trigger</TableHead>
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
                    <TableCell className="font-medium">{portfolio.ticker}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{portfolio.name}</p>
                        <p className="text-sm text-gray-500">ID: {portfolio.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {portfolio.holdingPeriod}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${portfolio.dividendReceived.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          portfolio.nonCompliantIncome > 5 
                            ? 'border-red-200 text-red-800' 
                            : portfolio.nonCompliantIncome > 2 
                            ? 'border-yellow-200 text-yellow-800'
                            : 'border-green-200 text-green-800'
                        }
                      >
                        {portfolio.nonCompliantIncome}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${portfolio.capitalGain.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-red-600" />
                        <span className="font-bold text-red-600">
                          ${portfolio.purificationDue.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1 text-yellow-600" />
                        <span className="text-sm">{portfolio.flagTrigger}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(portfolio.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No portfolios found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
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
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve All
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

export default PurificationDashboard