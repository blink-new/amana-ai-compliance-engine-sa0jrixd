import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  FileText,
  Calculator,
  Download,
  RefreshCw,
  Globe,
  Building2,
  DollarSign,
  PieChart,
  BarChart3,
  Info,
  ExternalLink,
  Calendar,
  Target,
  Shield,
  AlertCircle,
  Users
} from 'lucide-react'

interface StockProfileProps {
  stock: {
    id: string
    ticker: string
    companyName: string
    isin: string
    exchange: string
    sector: string
    marketCap: number
    lastPrice: number
    complianceStatus: 'compliant' | 'non_compliant' | 'review_needed'
    confidenceLevel: 'high' | 'medium' | 'low'
    overallScore: number
    lastReviewed: string
    jurisdiction: string
  }
  onBack: () => void
}

// Mock detailed data
const mockBusinessActivities = [
  { name: 'iPhone Sales', percentage: 52.3, classification: 'halal' as const, source: '10-K 2023' },
  { name: 'Mac Sales', percentage: 10.4, classification: 'halal' as const, source: '10-K 2023' },
  { name: 'iPad Sales', percentage: 8.8, classification: 'halal' as const, source: '10-K 2023' },
  { name: 'Wearables & Accessories', percentage: 9.7, classification: 'halal' as const, source: '10-K 2023' },
  { name: 'Services', percentage: 16.9, classification: 'halal' as const, source: '10-K 2023' },
  { name: 'Interest Income', percentage: 1.9, classification: 'haram' as const, source: '10-Q Q3 2023' }
]

const mockFinancialRatios = {
  debtToAssets: 0.28,
  cashInterestToAssets: 0.15,
  nonCompliantIncomeToRevenue: 0.019,
  receivablesToAssets: 0.12,
  thresholds: {
    debt: 0.33,
    cash: 0.33,
    income: 0.05,
    receivables: 0.45
  },
  source: '10-K 2023, 10-Q Q3 2023',
  reportingPeriod: 'Q3 2023'
}

const mockPurificationData = {
  nonCompliantIncomePerShare: 0.42,
  purificationPer1000: 4.20,
  methodology: 'AAOIFI',
  calculationDate: '2024-01-15',
  notes: 'Based on interest income from cash deposits and short-term investments'
}

const mockAuditTrail = [
  {
    id: '1',
    action: 'AI Analysis Completed',
    details: 'Parsed 10-K filing and identified revenue segments using NLP engine',
    source: 'SEC EDGAR - 10-K 2023',
    confidence: 0.95,
    timestamp: '2024-01-15T10:30:00Z',
    user: 'AI System',
    documentLinks: ['https://sec.gov/edgar/10-k-2023.pdf'],
    changes: []
  },
  {
    id: '2',
    action: 'Financial Ratios Calculated',
    details: 'Debt-to-assets ratio: 28% (Pass), Cash+Interest: 15% (Pass), Non-compliant income: 1.9% (Pass)',
    source: '10-K 2023, Balance Sheet & Income Statement',
    confidence: 0.92,
    timestamp: '2024-01-15T10:25:00Z',
    user: 'AI System',
    documentLinks: ['https://sec.gov/edgar/10-k-2023.pdf#page=45'],
    changes: []
  },
  {
    id: '3',
    action: 'Business Activity Classification',
    details: 'Classified interest income as non-compliant (1.9% of revenue). Main revenue from product sales (98.1%)',
    source: 'Footnote 12, 10-K - Revenue Recognition',
    confidence: 0.88,
    timestamp: '2024-01-15T10:20:00Z',
    user: 'AI System',
    documentLinks: ['https://sec.gov/edgar/10-k-2023.pdf#footnote12'],
    changes: []
  },
  {
    id: '4',
    action: 'Compliance Verdict Generated',
    details: 'Stock deemed compliant under AAOIFI standards. All ratios within thresholds.',
    source: 'AAOIFI Shariah Standard No. 21',
    confidence: 0.94,
    timestamp: '2024-01-15T10:35:00Z',
    user: 'AI System',
    documentLinks: ['https://aaoifi.com/standard-21/'],
    changes: []
  },
  {
    id: '5',
    action: 'Scholar Review',
    details: 'Reviewed by Dr. Ahmed Al-Rashid. Confirmed compliance status and purification calculation.',
    source: 'Manual Review',
    confidence: 1.0,
    timestamp: '2024-01-15T14:20:00Z',
    user: 'Dr. Ahmed Al-Rashid',
    documentLinks: [],
    changes: ['Added scholar note: "Monitor quarterly for any business model changes"']
  },
  {
    id: '6',
    action: 'Purification Calculated',
    details: 'Purification amount: $0.42 per share based on interest income allocation',
    source: 'AAOIFI Purification Methodology',
    confidence: 0.96,
    timestamp: '2024-01-15T10:40:00Z',
    user: 'AI System',
    documentLinks: ['https://aaoifi.com/purification-guide/'],
    changes: []
  }
]

const StockProfileCard: React.FC<StockProfileProps> = ({ stock, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600'
      case 'non_compliant': return 'text-red-600'
      case 'review_needed': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-5 h-5" />
      case 'non_compliant': return <AlertTriangle className="w-5 h-5" />
      case 'review_needed': return <Clock className="w-5 h-5" />
      default: return null
    }
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'halal': return 'bg-green-100 text-green-800 border-green-200'
      case 'haram': return 'bg-red-100 text-red-800 border-red-200'
      case 'doubtful': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
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
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRatioStatus = (value: number, threshold: number, inverse = false) => {
    const passes = inverse ? value > threshold : value < threshold
    return passes ? 'Pass' : 'Fail'
  }

  const getRatioColor = (value: number, threshold: number, inverse = false) => {
    const passes = inverse ? value > threshold : value < threshold
    return passes ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Screening
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{stock.ticker}</h1>
                  <p className="text-sm text-gray-500">{stock.companyName}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Re-screen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stock Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`flex items-center space-x-2 ${getStatusColor(stock.complianceStatus)}`}>
                    {getStatusIcon(stock.complianceStatus)}
                    <span className="text-lg font-semibold capitalize">
                      {stock.complianceStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {stock.confidenceLevel.charAt(0).toUpperCase() + stock.confidenceLevel.slice(1)} Confidence
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Compliance Score</span>
                    <span className="text-2xl font-bold text-gray-900">{stock.overallScore}%</span>
                  </div>
                  <Progress value={stock.overallScore} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-600">ISIN</p>
                    <p className="font-medium">{stock.isin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Exchange</p>
                    <p className="font-medium">{stock.exchange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sector</p>
                    <p className="font-medium">{stock.sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Market Cap</p>
                    <p className="font-medium">{formatMarketCap(stock.marketCap)}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Review Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Reviewed</span>
                      <span className="font-medium">{formatDate(stock.lastReviewed)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Review Frequency</span>
                      <span className="font-medium">Quarterly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Standard Applied</span>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{stock.jurisdiction}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Price</span>
                      <span className="text-lg font-bold text-gray-900">${stock.lastPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="business">Business Activities</TabsTrigger>
            <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
            <TabsTrigger value="purification">Purification</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Business Activity Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Revenue Breakdown</span>
                  </CardTitle>
                  <CardDescription>
                    Revenue sources categorized by Shariah compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBusinessActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="text-sm font-medium">{activity.name}</span>
                          <Badge 
                            variant="outline" 
                            className={getClassificationColor(activity.classification)}
                          >
                            {activity.classification}
                          </Badge>
                        </div>
                        <span className="text-sm font-semibold">{activity.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Audit Trail */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Audit Trail</span>
                  </CardTitle>
                  <CardDescription>
                    Complete analysis history with confidence scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAuditTrail.map((entry) => (
                      <div key={entry.id} className="border-l-2 border-primary/20 pl-4 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">{entry.action}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {Math.round(entry.confidence * 100)}% confidence
                            </Badge>
                            {entry.user !== 'AI System' && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                <Users className="w-3 h-3 mr-1" />
                                Scholar
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{entry.details}</p>
                        
                        {/* Document Links */}
                        {entry.documentLinks && entry.documentLinks.length > 0 && (
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="w-3 h-3 text-gray-400" />
                            <div className="flex flex-wrap gap-1">
                              {entry.documentLinks.map((link, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Source {index + 1}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Changes Made */}
                        {entry.changes && entry.changes.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Changes Made:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {entry.changes.map((change, index) => (
                                <li key={index} className="flex items-start space-x-1">
                                  <span className="text-green-600 mt-0.5">•</span>
                                  <span>{change}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <span>{entry.source}</span>
                            <span>•</span>
                            <span>By: {entry.user}</span>
                          </div>
                          <span>{formatTime(entry.timestamp)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Business Activity Analysis</span>
                </CardTitle>
                <CardDescription>
                  AI-powered classification of revenue sources from financial filings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockBusinessActivities.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{activity.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={getClassificationColor(activity.classification)}
                          >
                            {activity.classification.charAt(0).toUpperCase() + activity.classification.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{activity.percentage}%</p>
                          <p className="text-sm text-gray-500">of total revenue</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Source: {activity.source}</span>
                        </div>
                        {activity.classification === 'haram' && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>Requires purification</span>
                          </div>
                        )}
                      </div>
                      
                      <Progress 
                        value={activity.percentage} 
                        className="mt-3 h-2" 
                        max={100}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Financial Ratio Analysis</span>
                </CardTitle>
                <CardDescription>
                  Key financial metrics evaluated against AAOIFI thresholds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {/* Debt to Assets */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Debt to Total Assets</h3>
                        <Badge 
                          variant="outline"
                          className={getRatioColor(mockFinancialRatios.debtToAssets, mockFinancialRatios.thresholds.debt) === 'text-green-600' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                          }
                        >
                          {getRatioStatus(mockFinancialRatios.debtToAssets, mockFinancialRatios.thresholds.debt)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">
                          {(mockFinancialRatios.debtToAssets * 100).toFixed(1)}%
                        </span>
                        <span className="text-sm text-gray-500">
                          Threshold: ≤{(mockFinancialRatios.thresholds.debt * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress 
                        value={mockFinancialRatios.debtToAssets * 100} 
                        className="h-2" 
                        max={mockFinancialRatios.thresholds.debt * 100}
                      />
                    </div>

                    {/* Cash + Interest to Assets */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Cash + Interest to Assets</h3>
                        <Badge 
                          variant="outline"
                          className={getRatioColor(mockFinancialRatios.cashInterestToAssets, mockFinancialRatios.thresholds.cash) === 'text-green-600' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                          }
                        >
                          {getRatioStatus(mockFinancialRatios.cashInterestToAssets, mockFinancialRatios.thresholds.cash)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">
                          {(mockFinancialRatios.cashInterestToAssets * 100).toFixed(1)}%
                        </span>
                        <span className="text-sm text-gray-500">
                          Threshold: ≤{(mockFinancialRatios.thresholds.cash * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress 
                        value={mockFinancialRatios.cashInterestToAssets * 100} 
                        className="h-2" 
                        max={mockFinancialRatios.thresholds.cash * 100}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Non-compliant Income to Revenue */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Non-compliant Income</h3>
                        <Badge 
                          variant="outline"
                          className={getRatioColor(mockFinancialRatios.nonCompliantIncomeToRevenue, mockFinancialRatios.thresholds.income) === 'text-green-600' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                          }
                        >
                          {getRatioStatus(mockFinancialRatios.nonCompliantIncomeToRevenue, mockFinancialRatios.thresholds.income)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">
                          {(mockFinancialRatios.nonCompliantIncomeToRevenue * 100).toFixed(1)}%
                        </span>
                        <span className="text-sm text-gray-500">
                          Threshold: ≤{(mockFinancialRatios.thresholds.income * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress 
                        value={mockFinancialRatios.nonCompliantIncomeToRevenue * 100} 
                        className="h-2" 
                        max={mockFinancialRatios.thresholds.income * 100}
                      />
                    </div>

                    {/* Receivables to Assets */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Receivables to Assets</h3>
                        <Badge 
                          variant="outline"
                          className={getRatioColor(mockFinancialRatios.receivablesToAssets, mockFinancialRatios.thresholds.receivables) === 'text-green-600' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                          }
                        >
                          {getRatioStatus(mockFinancialRatios.receivablesToAssets, mockFinancialRatios.thresholds.receivables)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">
                          {(mockFinancialRatios.receivablesToAssets * 100).toFixed(1)}%
                        </span>
                        <span className="text-sm text-gray-500">
                          Threshold: ≤{(mockFinancialRatios.thresholds.receivables * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress 
                        value={mockFinancialRatios.receivablesToAssets * 100} 
                        className="h-2" 
                        max={mockFinancialRatios.thresholds.receivables * 100}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Data Source</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Source: {mockFinancialRatios.source} | Reporting Period: {mockFinancialRatios.reportingPeriod}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Purification Calculation</span>
                </CardTitle>
                <CardDescription>
                  Required purification amounts based on non-compliant income
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Purification Summary</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600">Non-compliant Income per Share</p>
                          <p className="text-2xl font-bold text-red-600">
                            ${mockPurificationData.nonCompliantIncomePerShare}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Purification per $1,000 Invested</p>
                          <p className="text-2xl font-bold text-primary">
                            ${mockPurificationData.purificationPer1000}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Methodology</p>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {mockPurificationData.methodology}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Calculation Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interest Income (% of Revenue)</span>
                          <span className="font-medium">1.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Revenue per Share</span>
                          <span className="font-medium">$22.11</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Non-compliant Income per Share</span>
                          <span className="font-medium text-red-600">$0.42</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Purification Required per Share</span>
                          <span className="text-primary">$0.42</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Investment Examples</h3>
                      <div className="space-y-4">
                        {[1000, 5000, 10000, 50000].map((amount) => (
                          <div key={amount} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">${amount.toLocaleString()} Investment</span>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                ${((amount / 1000) * mockPurificationData.purificationPer1000).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">purification required</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Export Options</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Download Purification Report (PDF)
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="w-4 h-4 mr-2" />
                          Export to Excel
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Send to Auditor
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Calculation Notes</h4>
                      <p className="text-sm text-blue-800">{mockPurificationData.notes}</p>
                      <p className="text-xs text-blue-600 mt-2">
                        Last calculated: {formatDate(mockPurificationData.calculationDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default StockProfileCard