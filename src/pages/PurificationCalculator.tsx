import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Calculator,
  Bell,
  LogOut,
  Settings,
  HelpCircle,
  Plus,
  FolderOpen,
  AlertTriangle,
  BarChart3,
  FileText,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Building
} from 'lucide-react'
import PortfoliosTab from '@/components/purification/PortfoliosTab'
import PurificationTriggersTab from '@/components/purification/PurificationTriggersTab'
import CalculationEngineTab from '@/components/purification/CalculationEngineTab'
import ReportsAuditTab from '@/components/purification/ReportsAuditTab'

const blink = createClient({
  projectId: 'amana-ai-compliance-engine-sa0jrixd',
  authRequired: true
})

const PurificationCalculator = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('portfolios')
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

  const handleSignOut = async () => {
    await blink.auth.logout('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading purification module...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
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
                Back to Dashboard
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Purification Module</h1>
                  <p className="text-sm text-gray-500">Portfolio compliance & purification management</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-gray-500">Fund Manager</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                📊 Purification Dashboard
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Comprehensive workflow for portfolio upload, trigger detection, purification calculation, and audit-ready reporting for Islamic fund managers.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                User Guide
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Upload Portfolio
              </Button>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Total Portfolios</p>
                    <p className="text-2xl font-bold text-blue-900">47</p>
                    <p className="text-xs text-blue-600">+3 this week</p>
                  </div>
                  <FolderOpen className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">Active Triggers</p>
                    <p className="text-2xl font-bold text-red-900">23</p>
                    <p className="text-xs text-red-600">Needs review</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Total Purification</p>
                    <p className="text-2xl font-bold text-purple-900">$2.4M</p>
                    <p className="text-xs text-purple-600">YTD amount</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Compliance Rate</p>
                    <p className="text-2xl font-bold text-green-900">94.2%</p>
                    <p className="text-xs text-green-600">Above target</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-700">Pending Reviews</p>
                    <p className="text-2xl font-bold text-yellow-900">8</p>
                    <p className="text-xs text-yellow-600">Awaiting approval</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Workflow Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger 
                value="portfolios" 
                className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">📂 Portfolios</span>
                <span className="sm:hidden">📂</span>
              </TabsTrigger>
              <TabsTrigger 
                value="triggers" 
                className="flex items-center space-x-2 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">🚨 Triggers</span>
                <span className="sm:hidden">🚨</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calculation" 
                className="flex items-center space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">📊 Calculation</span>
                <span className="sm:hidden">📊</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="flex items-center space-x-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">📄 Reports</span>
                <span className="sm:hidden">📄</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="portfolios" className="space-y-6">
            <PortfoliosTab />
          </TabsContent>

          <TabsContent value="triggers" className="space-y-6">
            <PurificationTriggersTab />
          </TabsContent>

          <TabsContent value="calculation" className="space-y-6">
            <CalculationEngineTab />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsAuditTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default PurificationCalculator