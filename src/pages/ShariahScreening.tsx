import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Shield, 
  Search, 
  Filter, 
  Upload, 
  Download,
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Settings,
  RefreshCw,
  Plus,
  Eye,
  Star,
  Globe,
  Bookmark,
  FolderPlus,
  History,
  AlertCircle,
  Target,
  PieChart,
  Layers,
  Users,
  Calendar,
  ExternalLink,
  Zap,
  Bell
} from 'lucide-react'
import StockProfileCard from '@/components/screening/StockProfileCard'
import PortfolioScreeningDashboard from '@/components/screening/PortfolioScreeningDashboard'
import ScreeningFilters from '@/components/screening/ScreeningFilters'

const blink = createClient({
  projectId: 'amana-ai-compliance-engine-sa0jrixd',
  authRequired: true
})

// Enhanced mock data with more comprehensive information
const mockStocks = [
  {
    id: 'stock_aapl',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    isin: 'US0378331005',
    exchange: 'NASDAQ',
    sector: 'Technology',
    country: 'United States',
    marketCap: 3000000000000,
    lastPrice: 185.50,
    priceChange: 2.35,
    priceChangePercent: 1.28,
    complianceStatus: 'compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 92.5,
    lastReviewed: '2024-01-15T10:30:00Z',
    nextReview: '2024-04-15T10:30:00Z',
    jurisdiction: 'AAOIFI',
    purificationAmount: 0.42,
    businessActivities: {
      halal: 98.1,
      haram: 1.9,
      doubtful: 0
    },
    ratios: {
      debtToAssets: 0.28,
      cashToAssets: 0.15,
      nonCompliantIncome: 0.019
    },
    alerts: [],
    inWatchlist: true,
    inPortfolio: false,
    scholarNotes: '',
    lastEarningsDate: '2024-01-11T16:00:00Z'
  },
  {
    id: 'stock_msft',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    isin: 'US5949181045',
    exchange: 'NASDAQ',
    sector: 'Technology',
    country: 'United States',
    marketCap: 2800000000000,
    lastPrice: 378.85,
    priceChange: -5.20,
    priceChangePercent: -1.35,
    complianceStatus: 'compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 88.3,
    lastReviewed: '2024-01-14T14:20:00Z',
    nextReview: '2024-04-14T14:20:00Z',
    jurisdiction: 'AAOIFI',
    purificationAmount: 0.28,
    businessActivities: {
      halal: 97.2,
      haram: 2.8,
      doubtful: 0
    },
    ratios: {
      debtToAssets: 0.22,
      cashToAssets: 0.18,
      nonCompliantIncome: 0.028
    },
    alerts: [],
    inWatchlist: false,
    inPortfolio: true,
    scholarNotes: '',
    lastEarningsDate: '2024-01-10T16:00:00Z'
  },
  {
    id: 'stock_tsla',
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    isin: 'US88160R1014',
    exchange: 'NASDAQ',
    sector: 'Automotive',
    country: 'United States',
    marketCap: 800000000000,
    lastPrice: 248.50,
    priceChange: 12.75,
    priceChangePercent: 5.41,
    complianceStatus: 'review_needed' as const,
    confidenceLevel: 'medium' as const,
    overallScore: 65.8,
    lastReviewed: '2024-01-13T09:15:00Z',
    nextReview: '2024-01-20T09:15:00Z',
    jurisdiction: 'AAOIFI',
    purificationAmount: 1.25,
    businessActivities: {
      halal: 92.5,
      haram: 4.2,
      doubtful: 3.3
    },
    ratios: {
      debtToAssets: 0.31,
      cashToAssets: 0.25,
      nonCompliantIncome: 0.042
    },
    alerts: [
      {
        type: 'earnings',
        message: 'Q4 earnings released - requires re-screening',
        priority: 'medium',
        date: '2024-01-13T09:00:00Z'
      }
    ],
    inWatchlist: true,
    inPortfolio: false,
    scholarNotes: 'Monitor energy storage business expansion',
    lastEarningsDate: '2024-01-12T16:00:00Z'
  },
  {
    id: 'stock_jpm',
    ticker: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    isin: 'US46625H1005',
    exchange: 'NYSE',
    sector: 'Financial Services',
    country: 'United States',
    marketCap: 450000000000,
    lastPrice: 155.25,
    priceChange: -2.10,
    priceChangePercent: -1.33,
    complianceStatus: 'non_compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 25.2,
    lastReviewed: '2024-01-12T16:45:00Z',
    nextReview: '2024-04-12T16:45:00Z',
    jurisdiction: 'AAOIFI',
    purificationAmount: 0,
    businessActivities: {
      halal: 15.2,
      haram: 84.8,
      doubtful: 0
    },
    ratios: {
      debtToAssets: 0.89,
      cashToAssets: 0.12,
      nonCompliantIncome: 0.848
    },
    alerts: [
      {
        type: 'compliance',
        message: 'Debt-to-assets ratio exceeds threshold (89% > 33%)',
        priority: 'high',
        date: '2024-01-12T16:45:00Z'
      }
    ],
    inWatchlist: false,
    inPortfolio: false,
    scholarNotes: 'Traditional banking - not Shariah compliant',
    lastEarningsDate: '2024-01-10T16:00:00Z'
  },
  {
    id: 'stock_ko',
    ticker: 'KO',
    companyName: 'The Coca-Cola Company',
    isin: 'US1912161007',
    exchange: 'NYSE',
    sector: 'Consumer Goods',
    country: 'United States',
    marketCap: 260000000000,
    lastPrice: 60.25,
    priceChange: 0.85,
    priceChangePercent: 1.43,
    complianceStatus: 'compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 94.1,
    lastReviewed: '2024-01-11T11:30:00Z',
    nextReview: '2024-04-11T11:30:00Z',
    jurisdiction: 'AAOIFI',
    purificationAmount: 0.15,
    businessActivities: {
      halal: 98.5,
      haram: 1.5,
      doubtful: 0
    },
    ratios: {
      debtToAssets: 0.25,
      cashToAssets: 0.08,
      nonCompliantIncome: 0.015
    },
    alerts: [],
    inWatchlist: false,
    inPortfolio: true,
    scholarNotes: '',
    lastEarningsDate: '2024-01-09T16:00:00Z'
  }
]

// Mock ETF data
const mockETFs = [
  {
    id: 'etf_spy',
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    isin: 'US78462F1030',
    exchange: 'NYSE',
    aum: 450000000000,
    expenseRatio: 0.0945,
    complianceScore: 72.3,
    compliantExposure: 68.5,
    nonCompliantExposure: 31.5,
    purificationPer1000: 8.75,
    topHoldings: [
      { ticker: 'AAPL', weight: 7.2, compliant: true },
      { ticker: 'MSFT', weight: 6.8, compliant: true },
      { ticker: 'GOOGL', weight: 4.1, compliant: true },
      { ticker: 'AMZN', weight: 3.2, compliant: true },
      { ticker: 'JPM', weight: 1.8, compliant: false }
    ],
    lastReviewed: '2024-01-15T10:00:00Z'
  },
  {
    id: 'etf_qqq',
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
    isin: 'US46090E1038',
    exchange: 'NASDAQ',
    aum: 200000000000,
    expenseRatio: 0.20,
    complianceScore: 85.7,
    compliantExposure: 82.3,
    nonCompliantExposure: 17.7,
    purificationPer1000: 4.25,
    topHoldings: [
      { ticker: 'AAPL', weight: 12.1, compliant: true },
      { ticker: 'MSFT', weight: 10.8, compliant: true },
      { ticker: 'GOOGL', weight: 6.2, compliant: true },
      { ticker: 'AMZN', weight: 5.8, compliant: true },
      { ticker: 'TSLA', weight: 4.1, compliant: false }
    ],
    lastReviewed: '2024-01-14T15:30:00Z'
  }
]

const ShariahScreening = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('AAOIFI')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSector, setSelectedSector] = useState('all')
  const [activeTab, setActiveTab] = useState('stocks')
  const [filteredStocks, setFilteredStocks] = useState(mockStocks)
  const [filteredETFs, setFilteredETFs] = useState(mockETFs)
  const [selectedStock, setSelectedStock] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showQuickScreen, setShowQuickScreen] = useState(false)
  const [quickScreenQuery, setQuickScreenQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'table'
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

  useEffect(() => {
    let filtered = mockStocks

    if (searchQuery) {
      filtered = filtered.filter(stock => 
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.isin.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(stock => stock.complianceStatus === selectedStatus)
    }

    if (selectedSector !== 'all') {
      filtered = filtered.filter(stock => stock.sector === selectedSector)
    }

    setFilteredStocks(filtered)
  }, [searchQuery, selectedStatus, selectedSector])

  const getStatusBadge = (status: string, confidenceLevel: string) => {
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

  const getConfidenceBadge = (level: string) => {
    const colors = {
      high: 'bg-blue-100 text-blue-800 border-blue-200',
      medium: 'bg-orange-100 text-orange-800 border-orange-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    
    return (
      <Badge variant="outline" className={colors[level as keyof typeof colors]}>
        {level.charAt(0).toUpperCase() + level.slice(1)} Confidence
      </Badge>
    )
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number, change: number, changePercent: number) => {
    const isPositive = change >= 0
    return (
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</p>
        <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}${change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
        </p>
      </div>
    )
  }

  const jurisdictions = [
    { value: 'AAOIFI', label: 'AAOIFI (Default)', flag: '🌍' },
    { value: 'SC_MALAYSIA', label: 'SC Malaysia', flag: '🇲🇾' },
    { value: 'DSN_MUI', label: 'DSN-MUI (Indonesia)', flag: '🇮🇩' },
    { value: 'SAUDI_CMA', label: 'Saudi CMA', flag: '🇸🇦' },
    { value: 'UAE_SCA', label: 'UAE SCA', flag: '🇦🇪' },
    { value: 'QATAR_QFMA', label: 'Qatar QFMA', flag: '🇶🇦' }
  ]

  const sectors = [
    'Technology', 'Financial Services', 'Healthcare', 'Consumer Goods', 
    'Automotive', 'Energy', 'Real Estate', 'Telecommunications'
  ]

  const handleQuickScreen = async () => {
    if (!quickScreenQuery.trim()) return
    
    // Simulate API call
    console.log('Quick screening:', quickScreenQuery)
    setShowQuickScreen(false)
    setQuickScreenQuery('')
    
    // In real implementation, this would trigger the screening process
    // and potentially navigate to results or show in a modal
  }

  const handleAddToWatchlist = (stockId: string) => {
    // Implementation for adding to watchlist
    console.log('Adding to watchlist:', stockId)
  }

  const handleAddToPortfolio = (stockId: string) => {
    // Implementation for adding to portfolio
    console.log('Adding to portfolio:', stockId)
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    // Implementation for bulk actions
    console.log('Bulk action:', action, selectedIds)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Shariah screening...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  if (selectedStock) {
    return (
      <StockProfileCard 
        stock={selectedStock} 
        onBack={() => setSelectedStock(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
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
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Shariah Screening</h1>
                  <p className="text-sm text-gray-500">AI-powered compliance analysis</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Screen Dialog */}
              <Dialog open={showQuickScreen} onOpenChange={setShowQuickScreen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Zap className="w-4 h-4 mr-2" />
                    Quick Screen
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Quick Screening</DialogTitle>
                    <DialogDescription>
                      Enter ticker, ISIN, or company name for instant screening
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="e.g., AAPL, US0378331005, or Apple Inc."
                        value={quickScreenQuery}
                        onChange={(e) => setQuickScreenQuery(e.target.value)}
                        className="pl-10"
                        onKeyPress={(e) => e.key === 'Enter' && handleQuickScreen()}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleQuickScreen} className="flex-1">
                        <Shield className="w-4 h-4 mr-2" />
                        Screen Now
                      </Button>
                      <Button variant="outline" onClick={() => setShowQuickScreen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jurisdictions.map((jurisdiction) => (
                    <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                      <div className="flex items-center space-x-2">
                        <span>{jurisdiction.flag}</span>
                        <span>{jurisdiction.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Quick Stats with Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Screened</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-green-600">+12% this month</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliant</p>
                  <p className="text-2xl font-bold text-green-600">892</p>
                  <p className="text-sm text-gray-500">71.5% of total</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                  <p className="text-sm text-gray-500">1.8% of total</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Non-Compliant</p>
                  <p className="text-2xl font-bold text-red-600">332</p>
                  <p className="text-sm text-gray-500">26.6% of total</p>
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
                  <p className="text-2xl font-bold text-orange-600">7</p>
                  <p className="text-sm text-gray-500">Require attention</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-100">
                  <Bell className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="stocks">Stock Screening</TabsTrigger>
              <TabsTrigger value="etfs">ETF Analysis</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio Monitor</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Data
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
              <Button size="sm" variant="outline">
                <History className="w-4 h-4 mr-2" />
                Audit Trail
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Screening
              </Button>
            </div>
          </div>

          <TabsContent value="stocks" className="space-y-6">
            {/* Enhanced Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by ticker, ISIN, or company name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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

                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sectors</SelectItem>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>

                    <div className="flex border rounded-lg">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-r-none"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                        className="rounded-l-none"
                      >
                        <Layers className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(selectedStatus !== 'all' || selectedSector !== 'all' || searchQuery) && (
                  <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary">
                        Search: {searchQuery}
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedStatus !== 'all' && (
                      <Badge variant="secondary">
                        Status: {selectedStatus.replace('_', ' ')}
                        <button 
                          onClick={() => setSelectedStatus('all')}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedSector !== 'all' && (
                      <Badge variant="secondary">
                        Sector: {selectedSector}
                        <button 
                          onClick={() => setSelectedSector('all')}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Advanced Filters Sidebar */}
            {showFilters && (
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <ScreeningFilters 
                    onFiltersChange={(filters) => console.log('Filters:', filters)}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
                <div className="lg:col-span-3">
                  {/* Stock results will be rendered here */}
                </div>
              </div>
            )}

            {/* Enhanced Stock Results */}
            <div className={`grid gap-6 ${!showFilters ? '' : 'lg:col-span-3'}`}>
              {filteredStocks.map((stock) => (
                <Card key={stock.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {stock.ticker}
                            </h3>
                            {getStatusBadge(stock.complianceStatus, stock.confidenceLevel)}
                            {getConfidenceBadge(stock.confidenceLevel)}
                            {stock.inWatchlist && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <Bookmark className="w-3 h-3 mr-1" />
                                Watchlist
                              </Badge>
                            )}
                            {stock.inPortfolio && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                <FolderPlus className="w-3 h-3 mr-1" />
                                Portfolio
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-1">{stock.companyName}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{stock.exchange}</span>
                            <span>•</span>
                            <span>{stock.sector}</span>
                            <span>•</span>
                            <span>{formatMarketCap(stock.marketCap)}</span>
                            <span>•</span>
                            <span>ISIN: {stock.isin}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-6 mb-2">
                          <div>
                            <p className="text-sm text-gray-500">Compliance Score</p>
                            <div className="flex items-center space-x-2">
                              <p className="text-2xl font-bold text-gray-900">
                                {stock.overallScore}%
                              </p>
                              <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ${
                                    stock.overallScore >= 80 ? 'bg-green-500' :
                                    stock.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${stock.overallScore}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          {formatPrice(stock.lastPrice, stock.priceChange, stock.priceChangePercent)}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Reviewed {formatDate(stock.lastReviewed)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Business Activity Breakdown */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Business Activities</span>
                        <span className="text-xs text-gray-500">
                          Purification: ${stock.purificationAmount}/share
                        </span>
                      </div>
                      <div className="flex space-x-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${stock.businessActivities.halal}%` }}
                        />
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${stock.businessActivities.haram}%` }}
                        />
                        <div 
                          className="bg-yellow-500" 
                          style={{ width: `${stock.businessActivities.doubtful}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Halal: {stock.businessActivities.halal}%</span>
                        <span>Haram: {stock.businessActivities.haram}%</span>
                        <span>Doubtful: {stock.businessActivities.doubtful}%</span>
                      </div>
                    </div>

                    {/* Alerts */}
                    {stock.alerts.length > 0 && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            {stock.alerts[0].message}
                          </span>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            {stock.alerts[0].priority}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>Standard: {stock.jurisdiction}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Next Review: {formatDate(stock.nextReview)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAddToWatchlist(stock.id)}
                        >
                          <Bookmark className="w-4 h-4 mr-2" />
                          {stock.inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedStock(stock)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Re-screen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStocks.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No stocks found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Stock
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="etfs" className="space-y-6">
            {/* ETF Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>ETF / Fund Screening</span>
                </CardTitle>
                <CardDescription>
                  Analyze underlying holdings and calculate purification requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredETFs.map((etf) => (
                    <Card key={etf.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{etf.ticker}</h3>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  etf.complianceScore >= 80 ? 'bg-green-100 text-green-800 border-green-200' :
                                  etf.complianceScore >= 60 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-red-100 text-red-800 border-red-200'
                                }`}
                              >
                                {etf.complianceScore}% Compliant
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-1">{etf.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{etf.exchange}</span>
                              <span>•</span>
                              <span>AUM: {formatMarketCap(etf.aum)}</span>
                              <span>•</span>
                              <span>Expense: {etf.expenseRatio}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Purification per $1,000</p>
                            <p className="text-2xl font-bold text-primary">${etf.purificationPer1000}</p>
                          </div>
                        </div>

                        {/* Compliance Breakdown */}
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          <div>
                            <h4 className="font-medium mb-2">Exposure Breakdown</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-green-600">Compliant Exposure</span>
                                <span className="font-medium">{etf.compliantExposure}%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-red-600">Non-Compliant Exposure</span>
                                <span className="font-medium">{etf.nonCompliantExposure}%</span>
                              </div>
                              <div className="flex space-x-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="bg-green-500" 
                                  style={{ width: `${etf.compliantExposure}%` }}
                                />
                                <div 
                                  className="bg-red-500" 
                                  style={{ width: `${etf.nonCompliantExposure}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Top Holdings</h4>
                            <div className="space-y-1">
                              {etf.topHoldings.map((holding, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{holding.ticker}</span>
                                    <div className={`w-2 h-2 rounded-full ${
                                      holding.compliant ? 'bg-green-500' : 'bg-red-500'
                                    }`} />
                                  </div>
                                  <span>{holding.weight}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>Last reviewed: {formatDate(etf.lastReviewed)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Holdings
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Export Report
                            </Button>
                            <Button size="sm">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Re-analyze
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioScreeningDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ShariahScreening