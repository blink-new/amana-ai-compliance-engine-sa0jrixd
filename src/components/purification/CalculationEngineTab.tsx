import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  Calculator,
  HelpCircle,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Percent,
  Calendar,
  Building,
  RefreshCw,
  Download,
  Save,
  Settings,
  Zap,
  FileText,
  TrendingUp,
  Shield,
  Globe,
  Eye,
  Flag
} from 'lucide-react'

// Mock calculation data
const mockCalculations = [
  {
    id: 'CALC001',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    holdingPeriod: '2023-01-15 to 2024-01-15',
    dividendReceived: 2450.00,
    nonHalalPercent: 3.2,
    capitalGain: 15000.00,
    dividendPurification: 78.40,
    capGainPurification: 480.00,
    totalPurification: 558.40,
    flagTrigger: 'Interest income breach',
    status: 'approved',
    lastCalculated: '2024-01-15T10:30:00',
    methodology: 'AAOIFI',
    hasOverride: false
  },
  {
    id: 'CALC002',
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    holdingPeriod: '2023-03-10 to Current',
    dividendReceived: 1850.00,
    nonHalalPercent: 2.1,
    capitalGain: 8500.00,
    dividendPurification: 38.85,
    capGainPurification: 178.50,
    totalPurification: 217.35,
    flagTrigger: 'Crypto subsidiary',
    status: 'pending',
    lastCalculated: '2024-01-14T14:20:00',
    methodology: 'AAOIFI',
    hasOverride: false
  },
  {
    id: 'CALC003',
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    holdingPeriod: '2023-06-20 to 2024-06-20',
    dividendReceived: 0.00,
    nonHalalPercent: 1.8,
    capitalGain: 12000.00,
    dividendPurification: 0.00,
    capGainPurification: 216.00,
    totalPurification: 216.00,
    flagTrigger: 'Ad revenue concerns',
    status: 'manual_review',
    lastCalculated: '2024-01-13T09:15:00',
    methodology: 'Malaysia SC',
    hasOverride: true
  },
  {
    id: 'CALC004',
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    holdingPeriod: '2023-02-01 to Current',
    dividendReceived: 0.00,
    nonHalalPercent: 0.5,
    capitalGain: 25000.00,
    dividendPurification: 0.00,
    capGainPurification: 125.00,
    totalPurification: 125.00,
    flagTrigger: 'Minor interest income',
    status: 'approved',
    lastCalculated: '2024-01-12T16:45:00',
    methodology: 'AAOIFI',
    hasOverride: false
  }
]

const CalculationEngineTab = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodologyFilter, setMethodologyFilter] = useState('all')
  const [shariahStandard, setShariahStandard] = useState('AAOIFI')
  const [autoRecalculate, setAutoRecalculate] = useState(true)
  const [selectedCalculations, setSelectedCalculations] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case 'manual_review':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Manual Review
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getMethodologyBadge = (methodology: string) => {
    const colors = {
      'AAOIFI': 'bg-blue-100 text-blue-800 border-blue-200',
      'Malaysia SC': 'bg-green-100 text-green-800 border-green-200',
      'Indonesia OJK': 'bg-purple-100 text-purple-800 border-purple-200',
      'Custom': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    
    return (
      <Badge className={colors[methodology as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        <Shield className="w-3 h-3 mr-1" />
        {methodology}
      </Badge>
    )
  }

  const filteredCalculations = mockCalculations.filter(calc => {
    const matchesSearch = calc.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || calc.status === statusFilter
    const matchesMethodology = methodologyFilter === 'all' || calc.methodology === methodologyFilter
    return matchesSearch && matchesStatus && matchesMethodology
  })

  const totalPurification = filteredCalculations.reduce((sum, calc) => sum + calc.totalPurification, 0)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-purple-900">📊 Calculation Engine</CardTitle>
              <CardDescription className="text-purple-700">
                Calculate purification amounts for each holding with full audit trail and methodology transparency
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure Rules
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                Recalculate All
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Calculation Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure Shariah standards and calculation parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shariah-standard">Shariah Standard</Label>
                <Select value={shariahStandard} onValueChange={setShariahStandard}>
                  <SelectTrigger>
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AAOIFI">AAOIFI (Default)</SelectItem>
                    <SelectItem value="Malaysia SC">Malaysia SC</SelectItem>
                    <SelectItem value="Indonesia OJK">Indonesia OJK</SelectItem>
                    <SelectItem value="Saudi Tadawul">Saudi Tadawul</SelectItem>
                    <SelectItem value="Custom">Custom Thresholds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-recalc">Auto-Recalculate</Label>
                  <p className="text-sm text-gray-500">
                    Automatically recalculate when standards change
                  </p>
                </div>
                <Switch
                  id="auto-recalc"
                  checked={autoRecalculate}
                  onCheckedChange={setAutoRecalculate}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Current Methodology</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>• Dividend Purification = Dividend × Non-Halal %</p>
                  <p>• Capital Gain Purification = Gain × Business Activity %</p>
                  <p>• Pro-rating applied for holding period</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Standard Differences</h4>
                <p className="text-sm text-yellow-700">
                  {shariahStandard === 'AAOIFI' 
                    ? 'Using AAOIFI standard with 5% threshold for non-compliant income'
                    : `Using ${shariahStandard} overlay - differences will be highlighted`
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
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
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="manual_review">Manual Review</SelectItem>
                </SelectContent>
              </Select>

              <Select value={methodologyFilter} onValueChange={setMethodologyFilter}>
                <SelectTrigger className="w-48">
                  <Shield className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Methodology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methodologies</SelectItem>
                  <SelectItem value="AAOIFI">AAOIFI</SelectItem>
                  <SelectItem value="Malaysia SC">Malaysia SC</SelectItem>
                  <SelectItem value="Indonesia OJK">Indonesia OJK</SelectItem>
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
                Export Results
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
                <p className="text-sm font-medium text-gray-600">Total Holdings</p>
                <p className="text-2xl font-bold text-gray-900">{filteredCalculations.length}</p>
                <p className="text-sm text-blue-600">In calculation engine</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Purification</p>
                <p className="text-2xl font-bold text-purple-900">${totalPurification.toLocaleString()}</p>
                <p className="text-sm text-purple-600">Combined amount</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {filteredCalculations.filter(c => c.status === 'pending' || c.status === 'manual_review').length}
                </p>
                <p className="text-sm text-yellow-600">Awaiting approval</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Manual Overrides</p>
                <p className="text-2xl font-bold text-red-900">
                  {filteredCalculations.filter(c => c.hasOverride).length}
                </p>
                <p className="text-sm text-red-600">With adjustments</p>
              </div>
              <Edit className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Calculation Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Purification Calculations</CardTitle>
              <CardDescription>
                Detailed calculation breakdown for each holding with methodology and audit trail
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Calculation Guide
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
                  <TableHead>Ticker / Name</TableHead>
                  <TableHead>Holding Period</TableHead>
                  <TableHead>Dividend Received</TableHead>
                  <TableHead>Non-Halal %</TableHead>
                  <TableHead>Capital Gain</TableHead>
                  <TableHead>💰 Dividend Purification</TableHead>
                  <TableHead>💰 Cap Gain Purification</TableHead>
                  <TableHead>🧮 Total Purification</TableHead>
                  <TableHead>Flag/Trigger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalculations.map((calc) => (
                  <TableRow key={calc.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedCalculations.includes(calc.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCalculations([...selectedCalculations, calc.id])
                          } else {
                            setSelectedCalculations(selectedCalculations.filter(id => id !== calc.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{calc.ticker}</span>
                          {calc.hasOverride && (
                            <Flag className="w-4 h-4 text-orange-500" title="Manual Override Applied" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{calc.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getMethodologyBadge(calc.methodology)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{calc.holdingPeriod}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="font-medium">${calc.dividendReceived.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          calc.nonHalalPercent > 5 
                            ? 'border-red-200 text-red-800' 
                            : calc.nonHalalPercent > 3 
                            ? 'border-yellow-200 text-yellow-800'
                            : 'border-green-200 text-green-800'
                        }
                      >
                        <Percent className="w-3 h-3 mr-1" />
                        {calc.nonHalalPercent}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                        <span className="font-medium text-green-600">${calc.capitalGain.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-bold text-red-600">${calc.dividendPurification.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          ${calc.dividendReceived.toLocaleString()} × {calc.nonHalalPercent}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-bold text-red-600">${calc.capGainPurification.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          ${calc.capitalGain.toLocaleString()} × {calc.nonHalalPercent}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-bold text-red-600 text-lg">${calc.totalPurification.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Total amount due
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1 text-yellow-600" />
                        <span className="text-sm">{calc.flagTrigger}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(calc.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" title="Explain Calculation">
                          <HelpCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Manual Override">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCalculations.length === 0 && (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No calculations found</h3>
              <p className="text-gray-600 mb-6">
                Upload a portfolio first to begin purification calculations
              </p>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Go to Portfolios
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCalculations.length > 0 && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="font-medium text-purple-900">
                  {selectedCalculations.length} calculation{selectedCalculations.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve All
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Recalculate
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Selected
                  </Button>
                  <Button size="sm" variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save to Report
                  </Button>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setSelectedCalculations([])}
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Calculation Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Total Purification Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dividend Purification:</span>
                  <span className="font-medium">
                    ${filteredCalculations.reduce((sum, c) => sum + c.dividendPurification, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Capital Gain Purification:</span>
                  <span className="font-medium">
                    ${filteredCalculations.reduce((sum, c) => sum + c.capGainPurification, 0).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Amount:</span>
                    <span className="font-bold text-red-600 text-lg">
                      ${totalPurification.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Status Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Approved:</span>
                  <span className="font-medium text-green-600">
                    {filteredCalculations.filter(c => c.status === 'approved').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pending:</span>
                  <span className="font-medium text-yellow-600">
                    {filteredCalculations.filter(c => c.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Manual Review:</span>
                  <span className="font-medium text-red-600">
                    {filteredCalculations.filter(c => c.status === 'manual_review').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Next Actions</h4>
              <div className="space-y-2">
                <Button size="sm" className="w-full justify-start">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Review Pending Items
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export for Audit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CalculationEngineTab