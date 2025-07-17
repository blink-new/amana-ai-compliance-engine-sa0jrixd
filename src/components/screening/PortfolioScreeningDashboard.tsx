import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  Trash2,
  Bell,
  History,
  Users,
  ExternalLink,
  AlertCircle,
  TrendingDown,
  Activity,
  Bookmark,
  Settings,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Flag
} from 'lucide-react'

// Enhanced mock portfolio data with historical tracking
const mockPortfolios = [
  {
    id: 'portfolio_1',
    name: 'Global Equity Fund',
    description: 'Diversified global equity portfolio',
    totalValue: 125000000,
    currency: 'USD',
    complianceScore: 87.3,
    previousScore: 85.1,
    holdingsCount: 45,
    compliantHoldings: 38,
    nonCompliantHoldings: 4,
    reviewNeeded: 3,
    purificationAmount: 156000,
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2023-06-15T09:00:00Z',
    manager: 'Sarah Johnson',
    alerts: [
      {
        id: 'alert_1',
        type: 'compliance_change',
        severity: 'medium',
        message: '3 stocks changed compliance status since last review',
        date: '2024-01-14T15:30:00Z',
        affectedHoldings: ['TSLA', 'META', 'NFLX']
      },
      {
        id: 'alert_2',
        type: 'threshold_breach',
        severity: 'high',
        message: 'XYZ Corp exceeded 30% interest income threshold',
        date: '2024-01-13T09:15:00Z',
        affectedHoldings: ['XYZ']
      }
    ],
    performance: {
      ytdReturn: 8.5,
      monthlyReturn: 2.1,
      volatility: 12.3
    }
  },
  {
    id: 'portfolio_2',
    name: 'Tech Growth Portfolio',
    description: 'Technology-focused growth investments',
    totalValue: 75000000,
    currency: 'USD',
    complianceScore: 92.1,
    previousScore: 90.8,
    holdingsCount: 28,
    compliantHoldings: 26,
    nonCompliantHoldings: 1,
    reviewNeeded: 1,
    purificationAmount: 45000,
    lastUpdated: '2024-01-14T14:20:00Z',
    createdAt: '2023-08-20T11:30:00Z',
    manager: 'Ahmed Al-Rashid',
    alerts: [],
    performance: {
      ytdReturn: 15.2,
      monthlyReturn: 3.8,
      volatility: 18.7
    }
  },
  {
    id: 'portfolio_3',
    name: 'Conservative Income',
    description: 'Low-risk income-generating assets',
    totalValue: 200000000,
    currency: 'USD',
    complianceScore: 94.8,
    previousScore: 94.2,
    holdingsCount: 62,
    compliantHoldings: 59,
    nonCompliantHoldings: 2,
    reviewNeeded: 1,
    purificationAmount: 89000,
    lastUpdated: '2024-01-13T16:45:00Z',
    createdAt: '2023-04-10T08:15:00Z',
    manager: 'Fatima Hassan',
    alerts: [
      {
        id: 'alert_3',
        type: 'review_due',
        severity: 'low',
        message: '5 holdings due for quarterly review',
        date: '2024-01-12T10:00:00Z',
        affectedHoldings: ['KO', 'PG', 'JNJ', 'WMT', 'PFE']
      }
    ],
    performance: {
      ytdReturn: 4.2,
      monthlyReturn: 0.8,
      volatility: 6.1
    }
  }
]

// Enhanced mock holdings with more detailed information
const mockHoldings = [
  {
    id: 'holding_1',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    isin: 'US0378331005',
    weight: 8.5,
    value: 10625000,
    shares: 57297,
    avgCost: 165.20,
    currentPrice: 185.50,
    unrealizedGainLoss: 1163940,
    complianceStatus: 'compliant' as const,
    complianceScore: 92.5,
    purificationAmount: 2400,
    purificationPerShare: 0.42,
    sector: 'Technology',
    country: 'United States',
    lastReviewed: '2024-01-15T10:30:00Z',
    nextReview: '2024-04-15T10:30:00Z',
    alerts: [],
    historicalCompliance: [
      { date: '2024-01-15', score: 92.5, status: 'compliant' },
      { date: '2023-10-15', score: 91.2, status: 'compliant' },
      { date: '2023-07-15', score: 89.8, status: 'compliant' }
    ]
  },
  {
    id: 'holding_2',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    isin: 'US5949181045',
    weight: 7.2,
    value: 9000000,
    shares: 23756,
    avgCost: 320.15,
    currentPrice: 378.85,
    unrealizedGainLoss: 1394156,
    complianceStatus: 'compliant' as const,
    complianceScore: 88.3,
    purificationAmount: 1800,
    purificationPerShare: 0.28,
    sector: 'Technology',
    country: 'United States',
    lastReviewed: '2024-01-14T14:20:00Z',
    nextReview: '2024-04-14T14:20:00Z',
    alerts: [],
    historicalCompliance: [
      { date: '2024-01-14', score: 88.3, status: 'compliant' },
      { date: '2023-10-14', score: 87.1, status: 'compliant' },
      { date: '2023-07-14', score: 85.9, status: 'compliant' }
    ]
  },
  {
    id: 'holding_3',
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    isin: 'US02079K3059',
    weight: 6.8,
    value: 8500000,
    shares: 61261,
    avgCost: 125.30,
    currentPrice: 138.75,
    unrealizedGainLoss: 824020,
    complianceStatus: 'compliant' as const,
    complianceScore: 85.7,
    purificationAmount: 3200,
    purificationPerShare: 0.52,
    sector: 'Technology',
    country: 'United States',
    lastReviewed: '2024-01-13T11:15:00Z',
    nextReview: '2024-04-13T11:15:00Z',
    alerts: [],
    historicalCompliance: [
      { date: '2024-01-13', score: 85.7, status: 'compliant' },
      { date: '2023-10-13', score: 84.2, status: 'compliant' },
      { date: '2023-07-13', score: 82.8, status: 'compliant' }
    ]
  },
  {
    id: 'holding_4',
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    isin: 'US88160R1014',
    weight: 4.2,
    value: 5250000,
    shares: 21127,
    avgCost: 220.80,
    currentPrice: 248.50,
    unrealizedGainLoss: 584217,
    complianceStatus: 'review_needed' as const,
    complianceScore: 65.8,
    purificationAmount: 8500,
    purificationPerShare: 1.25,
    sector: 'Automotive',
    country: 'United States',
    lastReviewed: '2024-01-13T09:15:00Z',
    nextReview: '2024-01-20T09:15:00Z',
    alerts: [
      {
        type: 'earnings',
        message: 'Q4 earnings released - requires re-screening',
        priority: 'medium',
        date: '2024-01-13T09:00:00Z'
      }
    ],
    historicalCompliance: [
      { date: '2024-01-13', score: 65.8, status: 'review_needed' },
      { date: '2023-10-13', score: 72.1, status: 'compliant' },
      { date: '2023-07-13', score: 74.5, status: 'compliant' }
    ]
  },
  {
    id: 'holding_5',
    ticker: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    isin: 'US46625H1005',
    weight: 3.8,
    value: 4750000,
    shares: 30596,
    avgCost: 145.20,
    currentPrice: 155.25,
    unrealizedGainLoss: 307440,
    complianceStatus: 'non_compliant' as const,
    complianceScore: 25.2,
    purificationAmount: 0, // No purification for non-compliant stocks
    purificationPerShare: 0,
    sector: 'Financial Services',
    country: 'United States',
    lastReviewed: '2024-01-12T16:45:00Z',
    nextReview: '2024-04-12T16:45:00Z',
    alerts: [
      {
        type: 'compliance',
        message: 'Debt-to-assets ratio exceeds threshold (89% > 33%)',
        priority: 'high',
        date: '2024-01-12T16:45:00Z'
      }
    ],
    historicalCompliance: [
      { date: '2024-01-12', score: 25.2, status: 'non_compliant' },
      { date: '2023-10-12', score: 24.8, status: 'non_compliant' },
      { date: '2023-07-12', score: 26.1, status: 'non_compliant' }
    ]
  }
]

const PortfolioScreeningDashboard = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(mockPortfolios[0])
  const [activeTab, setActiveTab] = useState('overview')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedHoldings, setSelectedHoldings] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('weight')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchHoldings, setSearchHoldings] = useState('')

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getAlertSeverityBadge = (severity: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    
    return (
      <Badge variant="outline" className={colors[severity as keyof typeof colors]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)} Priority
      </Badge>
    )
  }

  const sortedAndFilteredHoldings = React.useMemo(() => {
    let filtered = mockHoldings

    // Apply search filter
    if (searchHoldings) {
      filtered = filtered.filter(holding => 
        holding.ticker.toLowerCase().includes(searchHoldings.toLowerCase()) ||
        holding.companyName.toLowerCase().includes(searchHoldings.toLowerCase())
      )
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(holding => holding.complianceStatus === filterStatus)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'weight':
          aValue = a.weight
          bValue = b.weight
          break
        case 'value':
          aValue = a.value
          bValue = b.value
          break
        case 'compliance':
          aValue = a.complianceScore
          bValue = b.complianceScore
          break
        case 'purification':
          aValue = a.purificationAmount
          bValue = b.purificationAmount
          break
        case 'ticker':
          aValue = a.ticker
          bValue = b.ticker
          break
        default:
          aValue = a.weight
          bValue = b.weight
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

    return filtered
  }, [searchHoldings, filterStatus, sortBy, sortOrder])

  const handleSelectHolding = (holdingId: string) => {
    setSelectedHoldings(prev => 
      prev.includes(holdingId) 
        ? prev.filter(id => id !== holdingId)
        : [...prev, holdingId]
    )
  }

  const handleSelectAllHoldings = () => {
    if (selectedHoldings.length === sortedAndFilteredHoldings.length) {
      setSelectedHoldings([])
    } else {
      setSelectedHoldings(sortedAndFilteredHoldings.map(h => h.id))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on holdings:`, selectedHoldings)
    setSelectedHoldings([])
    setShowBulkActions(false)
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Selection with Enhanced Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Monitoring Dashboard</CardTitle>
              <CardDescription>
                Real-time compliance tracking and portfolio analysis
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Portfolio
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Portfolio Data</DialogTitle>
                    <DialogDescription>
                      Upload CSV/XLSX file or connect via API
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop your portfolio file here
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Or connect via API</p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        API Integration
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPortfolio.id === portfolio.id 
                    ? 'border-primary shadow-md ring-2 ring-primary/20' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedPortfolio(portfolio)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{portfolio.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`${getComplianceColor(portfolio.complianceScore)} border-current`}
                      >
                        {portfolio.complianceScore}%
                      </Badge>
                      {portfolio.alerts.length > 0 && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                          <Bell className="w-3 h-3 mr-1" />
                          {portfolio.alerts.length}
                        </Badge>
                      )}
                    </div>
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
                      <span className="text-gray-500">Manager</span>
                      <span className="font-medium">{portfolio.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">YTD Return</span>
                      <span className={`font-medium ${
                        portfolio.performance.ytdReturn >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {portfolio.performance.ytdReturn >= 0 ? '+' : ''}{portfolio.performance.ytdReturn}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purification</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(portfolio.purificationAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Compliance Score Trend */}
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Compliance Trend</span>
                      <span className={`${
                        portfolio.complianceScore > portfolio.previousScore ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {portfolio.complianceScore > portfolio.previousScore ? '+' : ''}
                        {(portfolio.complianceScore - portfolio.previousScore).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={portfolio.complianceScore} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Portfolio Stats */}
      <div className="grid lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className={`text-2xl font-bold ${getComplianceColor(selectedPortfolio.complianceScore)}`}>
                  {selectedPortfolio.complianceScore}%
                </p>
                <p className={`text-sm ${
                  selectedPortfolio.complianceScore > selectedPortfolio.previousScore ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedPortfolio.complianceScore > selectedPortfolio.previousScore ? '+' : ''}
                  {(selectedPortfolio.complianceScore - selectedPortfolio.previousScore).toFixed(1)}% from last review
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
                <p className={`text-sm ${
                  selectedPortfolio.performance.ytdReturn >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedPortfolio.performance.ytdReturn >= 0 ? '+' : ''}
                  {selectedPortfolio.performance.ytdReturn}% YTD
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
                  {((selectedPortfolio.purificationAmount / selectedPortfolio.totalValue) * 100).toFixed(3)}% of AUM
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-600">
                  {selectedPortfolio.alerts.length}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedPortfolio.alerts.filter(a => a.severity === 'high').length} high priority
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Detailed Analysis */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-fit grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
            <Button size="sm" variant="outline">
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Enhanced Compliance Breakdown */}
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

                {/* Visual representation */}
                <div className="mt-6">
                  <div className="flex space-x-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${(selectedPortfolio.compliantHoldings / selectedPortfolio.holdingsCount) * 100}%` }}
                    />
                    <div 
                      className="bg-red-500" 
                      style={{ width: `${(selectedPortfolio.nonCompliantHoldings / selectedPortfolio.holdingsCount) * 100}%` }}
                    />
                    <div 
                      className="bg-yellow-500" 
                      style={{ width: `${(selectedPortfolio.reviewNeeded / selectedPortfolio.holdingsCount) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Performance & Risk</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">YTD Return</span>
                    <span className={`text-lg font-bold ${
                      selectedPortfolio.performance.ytdReturn >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedPortfolio.performance.ytdReturn >= 0 ? '+' : ''}
                      {selectedPortfolio.performance.ytdReturn}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Monthly Return</span>
                    <span className={`text-lg font-bold ${
                      selectedPortfolio.performance.monthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedPortfolio.performance.monthlyReturn >= 0 ? '+' : ''}
                      {selectedPortfolio.performance.monthlyReturn}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Volatility (Annualized)</span>
                    <span className="text-lg font-bold text-gray-900">
                      {selectedPortfolio.performance.volatility}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sharpe Ratio</span>
                    <span className="text-lg font-bold text-gray-900">
                      {(selectedPortfolio.performance.ytdReturn / selectedPortfolio.performance.volatility).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Risk-Adjusted Score</span>
                      <span className="text-lg font-bold text-blue-600">
                        {((selectedPortfolio.complianceScore * selectedPortfolio.performance.ytdReturn) / 100).toFixed(1)}
                      </span>
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
              <div className="grid md:grid-cols-3 gap-8">
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
                    <p className="text-sm text-gray-600">Portfolio Manager</p>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <p className="font-medium">{selectedPortfolio.manager}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium">{formatDate(selectedPortfolio.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium">{formatDateTime(selectedPortfolio.lastUpdated)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Currency</p>
                    <p className="font-medium">{selectedPortfolio.currency}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Holdings</p>
                    <p className="font-medium">{selectedPortfolio.holdingsCount} positions</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Review Frequency</p>
                    <p className="font-medium">Quarterly</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Review</p>
                    <p className="font-medium">April 15, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-6">
          {/* Enhanced Holdings Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Portfolio Holdings</CardTitle>
                <div className="flex items-center space-x-2">
                  {selectedHoldings.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        {selectedHoldings.length} selected
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => setShowBulkActions(!showBulkActions)}>
                        <MoreHorizontal className="w-4 h-4 mr-2" />
                        Bulk Actions
                      </Button>
                    </div>
                  )}
                  <Button size="sm" variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Holdings
                  </Button>
                </div>
              </div>
              
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search holdings..."
                      value={searchHoldings}
                      onChange={(e) => setSearchHoldings(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="compliant">Compliant</SelectItem>
                    <SelectItem value="non_compliant">Non-Compliant</SelectItem>
                    <SelectItem value="review_needed">Review Needed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="compliance">Compliance Score</SelectItem>
                    <SelectItem value="purification">Purification</SelectItem>
                    <SelectItem value="ticker">Ticker</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Bulk Actions Panel */}
              {showBulkActions && selectedHoldings.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedHoldings.length} holdings selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('rescreen')}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Re-screen All
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('flag')}>
                        <Flag className="w-4 h-4 mr-2" />
                        Flag for Review
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Selected
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedHoldings([])}>
                        Clear Selection
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Holdings Table Header */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedHoldings.length === sortedAndFilteredHoldings.length && sortedAndFilteredHoldings.length > 0}
                    onChange={handleSelectAllHoldings}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Select All ({sortedAndFilteredHoldings.length} holdings)
                  </span>
                </div>
              </div>

              {/* Holdings List */}
              <div className="space-y-4">
                {sortedAndFilteredHoldings.map((holding) => (
                  <div key={holding.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      <input
                        type="checkbox"
                        checked={selectedHoldings.includes(holding.id)}
                        onChange={() => handleSelectHolding(holding.id)}
                        className="rounded border-gray-300"
                      />
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold">{holding.ticker}</h3>
                          {getStatusBadge(holding.complianceStatus)}
                          {holding.alerts.length > 0 && (
                            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Alert
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{holding.companyName}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{holding.sector}</span>
                          <span>•</span>
                          <span>{holding.country}</span>
                          <span>•</span>
                          <span>ISIN: {holding.isin}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Weight</p>
                        <p className="font-semibold">{holding.weight}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Value</p>
                        <p className="font-semibold">{formatCurrency(holding.value)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Compliance Score</p>
                        <p className={`font-semibold ${getComplianceColor(holding.complianceScore)}`}>
                          {holding.complianceScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current Price</p>
                        <p className="font-semibold">${holding.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Unrealized P&L</p>
                        <p className={`font-semibold ${
                          holding.unrealizedGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {holding.unrealizedGainLoss >= 0 ? '+' : ''}
                          {formatCurrency(holding.unrealizedGainLoss)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Purification</p>
                        <p className="font-semibold text-red-600">
                          {formatCurrency(holding.purificationAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Compliance History Mini Chart */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Compliance History</span>
                        <span className="text-xs text-gray-500">Last 3 reviews</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {holding.historicalCompliance.map((point, index) => (
                          <div key={index} className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              {new Date(point.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                            </div>
                            <div className={`h-2 rounded-full ${
                              point.status === 'compliant' ? 'bg-green-500' :
                              point.status === 'non_compliant' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                            <div className="text-xs text-gray-600 mt-1">{point.score}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alerts */}
                    {holding.alerts.length > 0 && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            {holding.alerts[0].message}
                          </span>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            {holding.alerts[0].priority}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Next Review: {formatDate(holding.nextReview)}</span>
                        </div>
                        <span>{holding.shares.toLocaleString()} shares @ ${holding.avgCost}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Re-screen
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

              {sortedAndFilteredHoldings.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No holdings found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Portfolio Alerts & Notifications</span>
              </CardTitle>
              <CardDescription>
                Real-time compliance changes and review requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPortfolio.alerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 pl-4 py-3 ${getAlertSeverityColor(alert.severity)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{alert.type.replace('_', ' ').toUpperCase()}</h4>
                      {getAlertSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{alert.message}</p>
                    {alert.affectedHoldings && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs text-gray-600">Affected Holdings:</span>
                        {alert.affectedHoldings.map((ticker, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ticker}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">{formatDateTime(alert.date)}</p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark as Read
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {selectedPortfolio.alerts.length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Alerts</h3>
                    <p className="text-gray-600">
                      Your portfolio is currently compliant with no pending issues
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Shariah Board & Audit Reports</span>
              </CardTitle>
              <CardDescription>
                Generate comprehensive compliance reports for stakeholders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Standard Reports</h3>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Quarterly Compliance Report</h4>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Comprehensive quarterly review with compliance scores, purification calculations, and audit trail
                    </p>
                    <Button size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Holdings Summary</h4>
                      <Badge variant="outline">Excel</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Detailed breakdown of all holdings with compliance status and purification amounts
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export to Excel
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Purification Summary</h4>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Detailed purification calculations for investor disclosure
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Summary
                    </Button>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Custom Report Builder</h3>
                  
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input id="report-name" placeholder="Enter report name" />
                      </div>
                      
                      <div>
                        <Label htmlFor="report-type">Report Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliance">Compliance Review</SelectItem>
                            <SelectItem value="purification">Purification Analysis</SelectItem>
                            <SelectItem value="audit">Audit Trail</SelectItem>
                            <SelectItem value="custom">Custom Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="date-range">Date Range</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Current Quarter</SelectItem>
                            <SelectItem value="last">Last Quarter</SelectItem>
                            <SelectItem value="ytd">Year to Date</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Add any specific notes or requirements for this report"
                          rows={3}
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate PDF
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Export Excel
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Scholar Review Mode</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Enable scholar review and approval workflow
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Enable Scholar Review
                    </Button>
                  </Card>
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