import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  Search,
  Filter,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronRight,
  Eye,
  CheckCircle,
  Clock,
  Building,
  DollarSign,
  Percent,
  FileText,
  ExternalLink,
  RefreshCw,
  Download,
  Bell,
  Flag,
  TrendingUp,
  Zap
} from 'lucide-react'

// Mock trigger data
const mockTriggers = [
  {
    id: 'TRG001',
    type: 'Interest Income Breach',
    severity: 'major',
    portfolioId: 'PF001',
    portfolioName: 'Global Equity Fund',
    securityTicker: 'AAPL',
    securityName: 'Apple Inc.',
    description: 'Interest income from cash deposits exceeds 5% threshold',
    percentage: 6.2,
    amount: 125000,
    source: 'Form 10-K, Note 8 - Interest Income',
    detectedDate: '2024-01-15',
    status: 'unreviewed',
    materiality: 'high',
    footnoteReference: 'Page 67, Note 8'
  },
  {
    id: 'TRG002',
    type: 'Derivatives Involvement',
    severity: 'major',
    portfolioId: 'PF002',
    portfolioName: 'Technology Sector Fund',
    securityTicker: 'MSFT',
    securityName: 'Microsoft Corporation',
    description: 'Significant derivatives trading for hedging purposes',
    percentage: 3.8,
    amount: 89000,
    source: 'Q4 2024 Earnings Call Transcript',
    detectedDate: '2024-01-14',
    status: 'reviewed',
    materiality: 'medium',
    footnoteReference: 'Derivatives section'
  },
  {
    id: 'TRG003',
    type: 'Non-Compliant Subsidiaries',
    severity: 'warning',
    portfolioId: 'PF001',
    portfolioName: 'Global Equity Fund',
    securityTicker: 'GOOGL',
    securityName: 'Alphabet Inc.',
    description: 'Financial services subsidiary generating interest income',
    percentage: 2.1,
    amount: 45000,
    source: 'Annual Report 2024 - Segment Analysis',
    detectedDate: '2024-01-13',
    status: 'unreviewed',
    materiality: 'low',
    footnoteReference: 'Business segments breakdown'
  },
  {
    id: 'TRG004',
    type: 'Earnings-Based Red Flags',
    severity: 'warning',
    portfolioId: 'PF003',
    portfolioName: 'Emerging Markets Fund',
    securityTicker: 'META',
    securityName: 'Meta Platforms Inc.',
    description: 'Advertising revenue from potentially non-compliant sources',
    percentage: 1.8,
    amount: 32000,
    source: 'Revenue breakdown by source',
    detectedDate: '2024-01-12',
    status: 'reviewed',
    materiality: 'low',
    footnoteReference: 'Revenue composition'
  },
  {
    id: 'TRG005',
    type: 'Interest Income Breach',
    severity: 'major',
    portfolioId: 'PF004',
    portfolioName: 'Healthcare Innovation Fund',
    securityTicker: 'JNJ',
    securityName: 'Johnson & Johnson',
    description: 'Treasury operations generating significant interest income',
    percentage: 7.5,
    amount: 156000,
    source: 'Cash flow statement analysis',
    detectedDate: '2024-01-11',
    status: 'unreviewed',
    materiality: 'high',
    footnoteReference: 'Cash and investments section'
  }
]

const PurificationTriggersTab = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [triggerTypeFilter, setTriggerTypeFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedTriggers, setExpandedTriggers] = useState<string[]>([])

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'major':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Major Breach
          </Badge>
        )
      case 'warning':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
        )
      case 'info':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Info className="w-3 h-3 mr-1" />
            Information
          </Badge>
        )
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reviewed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Reviewed
          </Badge>
        )
      case 'unreviewed':
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Clock className="w-3 h-3 mr-1" />
            Unreviewed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getMaterialityColor = (materiality: string) => {
    switch (materiality) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const toggleTriggerExpansion = (triggerId: string) => {
    setExpandedTriggers(prev => 
      prev.includes(triggerId) 
        ? prev.filter(id => id !== triggerId)
        : [...prev, triggerId]
    )
  }

  const filteredTriggers = mockTriggers.filter(trigger => {
    const matchesSearch = trigger.securityTicker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trigger.securityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trigger.portfolioName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = triggerTypeFilter === 'all' || trigger.type === triggerTypeFilter
    const matchesSeverity = severityFilter === 'all' || trigger.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || trigger.status === statusFilter
    return matchesSearch && matchesType && matchesSeverity && matchesStatus
  })

  const triggersByType = filteredTriggers.reduce((acc, trigger) => {
    if (!acc[trigger.type]) {
      acc[trigger.type] = []
    }
    acc[trigger.type].push(trigger)
    return acc
  }, {} as Record<string, typeof mockTriggers>)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-red-900">🚨 Purification Triggers</CardTitle>
              <CardDescription className="text-red-700">
                Event-driven alert center for compliance violations and purification requirements
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Configure Alerts
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Flag className="w-4 h-4 mr-2" />
                Create Manual Trigger
              </Button>
            </div>
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
                  placeholder="Search by ticker, security, or portfolio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={triggerTypeFilter} onValueChange={setTriggerTypeFilter}>
                <SelectTrigger className="w-52">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Trigger Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Interest Income Breach">Interest Income</SelectItem>
                  <SelectItem value="Derivatives Involvement">Derivatives</SelectItem>
                  <SelectItem value="Non-Compliant Subsidiaries">Subsidiaries</SelectItem>
                  <SelectItem value="Earnings-Based Red Flags">Earnings Issues</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="major">Major Breach</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unreviewed">Unreviewed</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
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
                Export Triggers
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
                <p className="text-sm font-medium text-gray-600">Total Triggers</p>
                <p className="text-2xl font-bold text-gray-900">{filteredTriggers.length}</p>
                <p className="text-sm text-red-600">Active alerts</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Major Breaches</p>
                <p className="text-2xl font-bold text-red-900">
                  {filteredTriggers.filter(t => t.severity === 'major').length}
                </p>
                <p className="text-sm text-red-600">Requires immediate action</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unreviewed</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {filteredTriggers.filter(t => t.status === 'unreviewed').length}
                </p>
                <p className="text-sm text-yellow-600">Pending review</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Impact</p>
                <p className="text-2xl font-bold text-purple-900">
                  ${(filteredTriggers.reduce((sum, t) => sum + t.amount, 0) / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-purple-600">Purification amount</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Triggers by Type */}
      <div className="space-y-4">
        {Object.entries(triggersByType).map(([type, triggers]) => (
          <Card key={type}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    type === 'Interest Income Breach' ? 'bg-red-100' :
                    type === 'Derivatives Involvement' ? 'bg-orange-100' :
                    type === 'Non-Compliant Subsidiaries' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {type === 'Interest Income Breach' && <DollarSign className="w-5 h-5 text-red-600" />}
                    {type === 'Derivatives Involvement' && <TrendingUp className="w-5 h-5 text-orange-600" />}
                    {type === 'Non-Compliant Subsidiaries' && <Building className="w-5 h-5 text-yellow-600" />}
                    {type === 'Earnings-Based Red Flags' && <Zap className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{type}</CardTitle>
                    <CardDescription>
                      {triggers.length} trigger{triggers.length > 1 ? 's' : ''} detected
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-sm">
                  {triggers.filter(t => t.status === 'unreviewed').length} unreviewed
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {triggers.map((trigger) => (
                <Collapsible key={trigger.id}>
                  <CollapsibleTrigger 
                    className="w-full"
                    onClick={() => toggleTriggerExpansion(trigger.id)}
                  >
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {expandedTriggers.includes(trigger.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                        
                        <div className="text-left">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="font-medium text-gray-900">
                              {trigger.securityTicker} - {trigger.securityName}
                            </span>
                            {getSeverityBadge(trigger.severity)}
                            {getStatusBadge(trigger.status)}
                          </div>
                          <p className="text-sm text-gray-600">{trigger.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Portfolio: {trigger.portfolioName}</span>
                            <span>•</span>
                            <span>Detected: {new Date(trigger.detectedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Percent className="w-4 h-4 text-gray-400" />
                          <span className="font-bold text-red-600">{trigger.percentage}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">${trigger.amount.toLocaleString()}</span>
                        </div>
                        <div className={`text-xs mt-1 ${getMaterialityColor(trigger.materiality)}`}>
                          {trigger.materiality} materiality
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Source Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span>{trigger.source}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                              <span>{trigger.footnoteReference}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Impact Analysis</h4>
                          <div className="space-y-2 text-sm">
                            <div>Affected Amount: <span className="font-medium">${trigger.amount.toLocaleString()}</span></div>
                            <div>Non-Compliant %: <span className="font-medium text-red-600">{trigger.percentage}%</span></div>
                            <div>Materiality: <span className={`font-medium ${getMaterialityColor(trigger.materiality)}`}>{trigger.materiality}</span></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Source Document
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Explain This Trigger
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {trigger.status === 'unreviewed' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Reviewed
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Override
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTriggers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No triggers found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || triggerTypeFilter !== 'all' || severityFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'All portfolios are currently compliant with no active triggers'
              }
            </p>
            {!(searchTerm || triggerTypeFilter !== 'all' || severityFilter !== 'all' || statusFilter !== 'all') && (
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Analysis
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PurificationTriggersTab