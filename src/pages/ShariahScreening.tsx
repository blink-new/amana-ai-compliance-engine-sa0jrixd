import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Globe
} from 'lucide-react'
import StockProfileCard from '@/components/screening/StockProfileCard'
import PortfolioScreeningDashboard from '@/components/screening/PortfolioScreeningDashboard'
import ScreeningFilters from '@/components/screening/ScreeningFilters'

const blink = createClient({
  projectId: 'amana-ai-compliance-engine-sa0jrixd',
  authRequired: true
})

// Mock data for demonstration
const mockStocks = [
  {
    id: 'stock_aapl',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    isin: 'US0378331005',
    exchange: 'NASDAQ',
    sector: 'Technology',
    marketCap: 3000000000000,
    lastPrice: 185.50,
    complianceStatus: 'compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 92.5,
    lastReviewed: '2024-01-15T10:30:00Z',
    jurisdiction: 'AAOIFI'
  },
  {
    id: 'stock_msft',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    isin: 'US5949181045',
    exchange: 'NASDAQ',
    sector: 'Technology',
    marketCap: 2800000000000,
    lastPrice: 378.85,
    complianceStatus: 'compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 88.3,
    lastReviewed: '2024-01-14T14:20:00Z',
    jurisdiction: 'AAOIFI'
  },
  {
    id: 'stock_tsla',
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    isin: 'US88160R1014',
    exchange: 'NASDAQ',
    sector: 'Automotive',
    marketCap: 800000000000,
    lastPrice: 248.50,
    complianceStatus: 'review_needed' as const,
    confidenceLevel: 'medium' as const,
    overallScore: 65.8,
    lastReviewed: '2024-01-13T09:15:00Z',
    jurisdiction: 'AAOIFI'
  },
  {
    id: 'stock_jpm',
    ticker: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    isin: 'US46625H1005',
    exchange: 'NYSE',
    sector: 'Financial Services',
    marketCap: 450000000000,
    lastPrice: 155.25,
    complianceStatus: 'non_compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 25.2,
    lastReviewed: '2024-01-12T16:45:00Z',
    jurisdiction: 'AAOIFI'
  },
  {
    id: 'stock_ko',
    ticker: 'KO',
    companyName: 'The Coca-Cola Company',
    isin: 'US1912161007',
    exchange: 'NYSE',
    sector: 'Consumer Goods',
    marketCap: 260000000000,
    lastPrice: 60.25,
    complianceStatus: 'compliant' as const,
    confidenceLevel: 'high' as const,
    overallScore: 94.1,
    lastReviewed: '2024-01-11T11:30:00Z',
    jurisdiction: 'AAOIFI'
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
  const [selectedStock, setSelectedStock] = useState(null)
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
        stock.companyName.toLowerCase().includes(searchQuery.toLowerCase())
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="stocks">Stock Screening</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
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
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Screening
              </Button>
            </div>
          </div>

          <TabsContent value="stocks" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by ticker or company name..."
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

                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock Results */}
            <div className="grid gap-6">
              {filteredStocks.map((stock) => (
                <Card key={stock.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {stock.ticker}
                            </h3>
                            {getStatusBadge(stock.complianceStatus, stock.confidenceLevel)}
                            {getConfidenceBadge(stock.confidenceLevel)}
                          </div>
                          <p className="text-gray-600">{stock.companyName}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>{stock.exchange}</span>
                            <span>•</span>
                            <span>{stock.sector}</span>
                            <span>•</span>
                            <span>{formatMarketCap(stock.marketCap)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-4 mb-2">
                          <div>
                            <p className="text-sm text-gray-500">Compliance Score</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {stock.overallScore}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Last Price</p>
                            <p className="text-lg font-semibold text-gray-900">
                              ${stock.lastPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Reviewed {formatDate(stock.lastReviewed)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Globe className="w-4 h-4" />
                        <span>Standard: {stock.jurisdiction}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
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

          <TabsContent value="portfolio">
            <PortfolioScreeningDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ShariahScreening