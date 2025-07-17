import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Upload, 
  Download, 
  Plus,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Eye,
  RefreshCw,
  Filter,
  Calendar,
  Target,
  Trash2
} from 'lucide-react'

// Mock portfolio data
const mockPortfolios = [
  {
    id: 'portfolio_1',
    name: 'Global Equity Fund',
    description: 'Diversified global equity portfolio',
    totalValue: 125000000,
    currency: 'USD',
    complianceScore: 87.3,
    holdingsCount: 45,
    compliantHoldings: 38,
    nonCompliantHoldings: 4,
    reviewNeeded: 3,
    purificationAmount: 156000,
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2023-06-15T09:00:00Z'
  },
  {
    id: 'portfolio_2',
    name: 'Tech Growth Portfolio',
    description: 'Technology-focused growth investments',
    totalValue: 75000000,
    currency: 'USD',
    complianceScore: 92.1,
    holdingsCount: 28,
    compliantHoldings: 26,
    nonCompliantHoldings: 1,
    reviewNeeded: 1,
    purificationAmount: 45000,
    lastUpdated: '2024-01-14T14:20:00Z',
    createdAt: '2023-08-20T11:30:00Z'
  },
  {
    id: 'portfolio_3',
    name: 'Conservative Income',
    description: 'Low-risk income-generating assets',
    totalValue: 200000000,
    currency: 'USD',
    complianceScore: 94.8,
    holdingsCount: 62,
    compliantHoldings: 59,
    nonCompliantHoldings: 2,
    reviewNeeded: 1,
    purificationAmount: 89000,
    lastUpdated: '2024-01-13T16:45:00Z',
    createdAt: '2023-04-10T08:15:00Z'
  }
]

const mockHoldings = [
  {
    id: 'holding_1',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    weight: 8.5,
    value: 10625000,
    shares: 57297,
    complianceStatus: 'compliant' as const,
    purificationAmount: 2400,
    sector: 'Technology',
    lastPrice: 185.50
  },
  {
    id: 'holding_2',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    weight: 7.2,
    value: 9000000,
    shares: 23756,
    complianceStatus: 'compliant' as const,
    purificationAmount: 1800,
    sector: 'Technology',
    lastPrice: 378.85
  },
  {
    id: 'holding_3',
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    weight: 6.8,
    value: 8500000,
    shares: 61261,
    complianceStatus: 'compliant' as const,
    purificationAmount: 3200,
    sector: 'Technology',
    lastPrice: 138.75
  },
  {
    id: 'holding_4',
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    weight: 4.2,
    value: 5250000,
    shares: 21127,
    complianceStatus: 'review_needed' as const,
    purificationAmount: 8500,
    sector: 'Automotive',
    lastPrice: 248.50
  },
  {
    id: 'holding_5',
    ticker: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    weight: 3.8,
    value: 4750000,
    shares: 30596,
    complianceStatus: 'non_compliant' as const,
    purificationAmount: 95000,
    sector: 'Financial Services',
    lastPrice: 155.25
  }
]

const PortfolioScreeningDashboard = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(mockPortfolios[0])
  const [activeTab, setActiveTab] = useState('overview')
  const [showUploadModal, setShowUploadModal] = useState(false)

  const formatCurrency = (value: number, currency = 'USD') => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`
    return `$${value.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Compliant
          </Badge>
        )
      case 'non_compliant':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Non-Compliant
          </Badge>
        )
      case 'review_needed':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Review Needed
          </Badge>
        )
      default:
        return null
    }
  }

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Screening Dashboard</CardTitle>
              <CardDescription>
                Monitor and analyze Shariah compliance across your portfolios
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => setShowUploadModal(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Portfolio
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {mockPortfolios.map((portfolio) => (
              <Card 
                key={portfolio.id}
                className={`cursor-pointer transition-all ${
                  selectedPortfolio.id === portfolio.id 
                    ? 'border-primary shadow-md' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedPortfolio(portfolio)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{portfolio.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`${getComplianceColor(portfolio.complianceScore)} border-current`}
                    >
                      {portfolio.complianceScore}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{portfolio.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Value</span>
                      <span className="font-medium">{formatCurrency(portfolio.totalValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Holdings</span>
                      <span className="font-medium">{portfolio.holdingsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purification</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(portfolio.purificationAmount)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Portfolio Details */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className={`text-2xl font-bold ${getComplianceColor(selectedPortfolio.complianceScore)}`}>
                  {selectedPortfolio.complianceScore}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress value={selectedPortfolio.complianceScore} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(selectedPortfolio.totalValue)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Holdings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedPortfolio.holdingsCount}
                </p>
                <p className="text-sm text-green-600">
                  {selectedPortfolio.compliantHoldings} compliant
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Purification</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(selectedPortfolio.purificationAmount)}
                </p>
                <p className="text-sm text-gray-500">
                  {((selectedPortfolio.purificationAmount / selectedPortfolio.totalValue) * 100).toFixed(2)}% of AUM
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Compliance Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Compliance Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Compliant</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{selectedPortfolio.compliantHoldings}</span>
                      <p className="text-sm text-gray-500">
                        {((selectedPortfolio.compliantHoldings / selectedPortfolio.holdingsCount) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">Non-Compliant</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{selectedPortfolio.nonCompliantHoldings}</span>
                      <p className="text-sm text-gray-500">
                        {((selectedPortfolio.nonCompliantHoldings / selectedPortfolio.holdingsCount) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">Review Needed</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{selectedPortfolio.reviewNeeded}</span>
                      <p className="text-sm text-gray-500">
                        {((selectedPortfolio.reviewNeeded / selectedPortfolio.holdingsCount) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historical Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Compliance Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Score</span>
                    <span className="text-lg font-bold">{selectedPortfolio.complianceScore}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Month</span>
                    <span className="text-lg font-bold">85.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">3 Months Ago</span>
                    <span className="text-lg font-bold">82.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">6 Months Ago</span>
                    <span className="text-lg font-bold">79.3%</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">Improvement</span>
                      <span className="text-lg font-bold text-green-600">+8.0%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Information */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Portfolio Name</p>
                    <p className="font-medium">{selectedPortfolio.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-medium">{selectedPortfolio.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium">{formatDate(selectedPortfolio.createdAt)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium">{formatDate(selectedPortfolio.lastUpdated)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Currency</p>
                    <p className="font-medium">{selectedPortfolio.currency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Holdings</p>
                    <p className="font-medium">{selectedPortfolio.holdingsCount} positions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Portfolio Holdings</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHoldings.map((holding) => (
                  <div key={holding.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold">{holding.ticker}</h3>
                            {getStatusBadge(holding.complianceStatus)}
                          </div>
                          <p className="text-sm text-gray-600">{holding.companyName}</p>
                          <p className="text-xs text-gray-500">{holding.sector}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="grid grid-cols-3 gap-6 text-sm">
                          <div>
                            <p className="text-gray-500">Weight</p>
                            <p className="font-semibold">{holding.weight}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Value</p>
                            <p className="font-semibold">{formatCurrency(holding.value)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Purification</p>
                            <p className="font-semibold text-red-600">
                              {formatCurrency(holding.purificationAmount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{holding.shares.toLocaleString()} shares</span>
                        <span>•</span>
                        <span>${holding.lastPrice}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Portfolio Alerts</span>
              </CardTitle>
              <CardDescription>
                Real-time notifications about compliance changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-red-900">Compliance Breach</h4>
                    <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                  </div>
                  <p className="text-sm text-red-800 mb-2">
                    JPM (JPMorgan Chase) has breached debt-to-assets threshold (35% &gt; 33%)
                  </p>
                  <p className="text-xs text-red-600">2 hours ago</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-900">Review Required</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
                  </div>
                  <p className="text-sm text-yellow-800 mb-2">
                    TSLA (Tesla) quarterly earnings released - requires re-screening
                  </p>
                  <p className="text-xs text-yellow-600">1 day ago</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900">Information</h4>
                    <Badge className="bg-blue-100 text-blue-800">Low Priority</Badge>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">
                    Portfolio compliance score improved by 2.2% this month
                  </p>
                  <p className="text-xs text-blue-600">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PortfolioScreeningDashboard