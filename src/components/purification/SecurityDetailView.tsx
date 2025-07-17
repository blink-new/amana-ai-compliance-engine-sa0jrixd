import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  BarChart3,
  PieChart,
  Download,
  Share,
  HelpCircle,
  ExternalLink,
  Clock,
  Percent,
  Globe,
  Users,
  Zap
} from 'lucide-react'

interface SecurityDetailViewProps {
  security: {
    ticker: string
    name: string
    sector: string
    marketCap: number
    holdingPeriod: string
    dividendReceived: number
    nonCompliantIncome: number
    capitalGain: number
    purificationDue: number
    flagTrigger: string
    status: string
  }
  onBack: () => void
}

const SecurityDetailView: React.FC<SecurityDetailViewProps> = ({ security, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock detailed data
  const complianceHistory = [
    { date: '2024-01', percentage: 2.1, status: 'compliant' },
    { date: '2024-02', percentage: 2.8, status: 'compliant' },
    { date: '2024-03', percentage: 3.2, status: 'warning' },
    { date: '2024-04', percentage: 3.5, status: 'warning' },
    { date: '2024-05', percentage: 4.1, status: 'breach' },
    { date: '2024-06', percentage: 3.8, status: 'warning' }
  ]

  const businessSegments = [
    { segment: 'Consumer Products', revenue: 65, compliant: true },
    { segment: 'Services', revenue: 25, compliant: true },
    { segment: 'Financial Services', revenue: 7, compliant: false },
    { segment: 'Interest Income', revenue: 3, compliant: false }
  ]

  const purificationBreakdown = [
    { type: 'Dividend Purification', amount: 78.40, percentage: 3.2, description: 'Based on non-compliant income ratio' },
    { type: 'Capital Gain Purification', amount: 480.00, percentage: 3.2, description: 'Pro-rated for holding period' },
    { type: 'Interest Income Adjustment', amount: 225.60, percentage: 3.2, description: 'Direct interest earnings' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'breach': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">{security.ticker}</h1>
              <Badge className="bg-blue-100 text-blue-800">{security.sector}</Badge>
            </div>
            <p className="text-gray-600">{security.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share Analysis
          </Button>
          <Button size="sm">
            <HelpCircle className="w-4 h-4 mr-2" />
            Explain This
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Non-Compliant Income</p>
                <p className="text-2xl font-bold text-red-600">{security.nonCompliantIncome}%</p>
                <p className="text-sm text-gray-500">Above 5% threshold</p>
              </div>
              <Percent className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Purification Due</p>
                <p className="text-2xl font-bold text-red-600">${security.purificationDue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total amount</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Capital Gain</p>
                <p className="text-2xl font-bold text-green-600">${security.capitalGain.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total gain</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Holding Period</p>
                <p className="text-lg font-bold text-gray-900">365 days</p>
                <p className="text-sm text-gray-500">{security.holdingPeriod}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance History</TabsTrigger>
          <TabsTrigger value="segments">Business Segments</TabsTrigger>
          <TabsTrigger value="calculation">Calculation Details</TabsTrigger>
          <TabsTrigger value="documents">Source Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Purification Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Purification Summary</span>
                </CardTitle>
                <CardDescription>
                  Breakdown of purification requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {purificationBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.type}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">${item.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">Total Purification</p>
                    <p className="text-xl font-bold text-red-600">${security.purificationDue.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flag Trigger Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Compliance Issues</span>
                </CardTitle>
                <CardDescription>
                  Why this security requires purification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Primary Issue</h4>
                      <p className="text-red-700 mt-1">{security.flagTrigger}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Contributing Factors:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Interest income from cash holdings (2.1%)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Financial services subsidiary (1.1%)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm">Minor non-compliant activities (0.3%)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <p className="text-sm text-blue-800">
                      <strong>AAOIFI Standard:</strong> Securities with &gt;5% non-compliant income require purification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Methodology */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Calculation Methodology</span>
              </CardTitle>
              <CardDescription>
                How purification amounts were calculated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Dividend-Based Method</h4>
                  <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm">
                    <p>Dividend Received × Non-Compliant %</p>
                    <p className="text-blue-600">${security.dividendReceived.toLocaleString()} × {security.nonCompliantIncome}% = ${(security.dividendReceived * security.nonCompliantIncome / 100).toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Capital Gain Method</h4>
                  <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm">
                    <p>Capital Gain × Non-Compliant Ratio</p>
                    <p className="text-blue-600">${security.capitalGain.toLocaleString()} × {security.nonCompliantIncome}% = ${(security.capitalGain * security.nonCompliantIncome / 100).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Pro-rating Applied</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Amounts are pro-rated based on the holding period of 365 days. Full year holding = 100% of calculated purification.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Compliance History</span>
              </CardTitle>
              <CardDescription>
                Non-compliant income percentage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900">{entry.date}</div>
                      <Badge 
                        className={
                          entry.status === 'compliant' ? 'bg-green-100 text-green-800' :
                          entry.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {entry.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32">
                        <Progress 
                          value={entry.percentage * 10} 
                          className={`h-2 ${
                            entry.status === 'compliant' ? '[&>div]:bg-green-500' :
                            entry.status === 'warning' ? '[&>div]:bg-yellow-500' :
                            '[&>div]:bg-red-500'
                          }`}
                        />
                      </div>
                      <div className={`font-medium ${getStatusColor(entry.status)}`}>
                        {entry.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Business Segments Breakdown</span>
              </CardTitle>
              <CardDescription>
                Revenue breakdown by business segment and compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessSegments.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{segment.segment}</p>
                        <p className="text-sm text-gray-600">{segment.revenue}% of total revenue</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-24">
                        <Progress value={segment.revenue} className="h-2" />
                      </div>
                      <Badge 
                        className={
                          segment.compliant 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {segment.compliant ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Compliant
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Non-Compliant
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Detailed Calculations</span>
              </CardTitle>
              <CardDescription>
                Step-by-step calculation breakdown with formulas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Step 1: Identify Non-Compliant Income Sources</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Interest income from cash deposits: 2.1%</p>
                    <p>• Financial services subsidiary: 1.1%</p>
                    <p>• Total non-compliant income: <strong>3.2%</strong></p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-3">Step 2: Calculate Dividend Purification</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <p>Dividend Received: ${security.dividendReceived.toLocaleString()}</p>
                    <p>Non-Compliant %: {security.nonCompliantIncome}%</p>
                    <p>Purification = ${security.dividendReceived.toLocaleString()} × {security.nonCompliantIncome}% = <strong>${(security.dividendReceived * security.nonCompliantIncome / 100).toFixed(2)}</strong></p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-3">Step 3: Calculate Capital Gain Purification</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <p>Capital Gain: ${security.capitalGain.toLocaleString()}</p>
                    <p>Non-Compliant Ratio: {security.nonCompliantIncome}%</p>
                    <p>Purification = ${security.capitalGain.toLocaleString()} × {security.nonCompliantIncome}% = <strong>${(security.capitalGain * security.nonCompliantIncome / 100).toFixed(2)}</strong></p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">Step 4: Apply Pro-rating (if applicable)</h4>
                  <div className="space-y-2 text-sm">
                    <p>Holding Period: 365 days (Full year)</p>
                    <p>Pro-rating Factor: 100% (no adjustment needed)</p>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-3">Final Result</h4>
                  <div className="space-y-2 text-sm">
                    <p>Total Purification Required: <strong className="text-lg">${security.purificationDue.toFixed(2)}</strong></p>
                    <p className="text-xs text-gray-600">This amount should be donated to charity to purify the investment</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Source Documents & References</span>
              </CardTitle>
              <CardDescription>
                Financial statements, footnotes, and data sources used in analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Annual Report 2024 - Form 10-K', type: 'Financial Statement', pages: 'Pages 45-67', confidence: 'High' },
                  { name: 'Q4 2024 Earnings Call Transcript', type: 'Earnings Call', pages: 'Full transcript', confidence: 'Medium' },
                  { name: 'Segment Revenue Breakdown', type: 'Financial Data', pages: 'Note 15', confidence: 'High' },
                  { name: 'Interest Income Disclosure', type: 'Footnote', pages: 'Note 8', confidence: 'High' }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.type} • {doc.pages}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={
                          doc.confidence === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {doc.confidence} Confidence
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Data Sources</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Analysis based on Refinitiv financial data, S&P Capital IQ, and company filings. 
                      All calculations follow AAOIFI Shariah Standard No. 21.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SecurityDetailView