import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Shield, 
  FileText, 
  Calculator, 
  LogOut, 
  Settings, 
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  FileCheck,
  DollarSign,
  Users,
  Activity,
  Plus
} from 'lucide-react'

const blink = createClient({
  projectId: 'amana-ai-compliance-engine-sa0jrixd',
  authRequired: true
})

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
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
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const modules = [
    {
      icon: Shield,
      title: "Shariah Screening",
      description: "Screen stocks & ETFs for Shariah compliance",
      status: "active",
      lastUsed: "2 hours ago",
      color: "bg-green-500",
      stats: { processed: 1247, compliant: 892, pending: 23 }
    },
    {
      icon: FileText,
      title: "Marketing Review",
      description: "Review marketing materials for compliance",
      status: "active",
      lastUsed: "1 day ago",
      color: "bg-blue-500",
      stats: { processed: 89, approved: 76, pending: 5 }
    },
    {
      icon: Calculator,
      title: "Purification Calculator",
      description: "Calculate purification and zakat amounts",
      status: "active",
      lastUsed: "3 hours ago",
      color: "bg-purple-500",
      stats: { portfolios: 156, calculated: 2.4, currency: "M USD" }
    }
  ]

  const recentActivity = [
    {
      type: "screening",
      title: "Apple Inc. (AAPL) screening completed",
      status: "compliant",
      time: "2 hours ago",
      icon: Shield
    },
    {
      type: "review",
      title: "Q4 Marketing Brochure reviewed",
      status: "approved",
      time: "4 hours ago",
      icon: FileText
    },
    {
      type: "calculation",
      title: "Portfolio ABC purification calculated",
      status: "completed",
      time: "6 hours ago",
      icon: Calculator
    },
    {
      type: "screening",
      title: "Tesla Inc. (TSLA) flagged for review",
      status: "pending",
      time: "1 day ago",
      icon: AlertTriangle
    }
  ]

  const quickStats = [
    {
      title: "Total Screenings",
      value: "1,247",
      change: "+12%",
      icon: BarChart3,
      color: "text-green-600"
    },
    {
      title: "Compliance Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Documents Reviewed",
      value: "89",
      change: "+8%",
      icon: FileCheck,
      color: "text-blue-600"
    },
    {
      title: "Purification Amount",
      value: "$2.4M",
      change: "-5%",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-primary">Amana AI</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Activity className="w-3 h-3 mr-1" />
                All Systems Operational
              </Badge>
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
                  <p className="text-xs text-gray-500">Compliance Officer</p>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.email?.split('@')[0]}
          </h1>
          <p className="text-gray-600">
            Here's your Shariah compliance overview for today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100`}>
                    <stat.icon className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Modules */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Compliance Modules</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </div>

            <div className="grid gap-6">
              {modules.map((module, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${module.color}`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        Last used {module.lastUsed}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => {
                          if (module.title === "Shariah Screening") {
                            navigate('/screening')
                          }
                        }}
                      >
                        Open Module
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      {Object.entries(module.stats).map(([key, value], statIndex) => (
                        <div key={statIndex} className="text-center">
                          <p className="text-lg font-semibold text-gray-900">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {key === 'currency' ? '' : key}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest compliance actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'compliant' || activity.status === 'approved' || activity.status === 'completed'
                        ? 'bg-green-100' 
                        : 'bg-yellow-100'
                    }`}>
                      <activity.icon className={`w-4 h-4 ${
                        activity.status === 'compliant' || activity.status === 'approved' || activity.status === 'completed'
                          ? 'text-green-600' 
                          : 'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={
                        activity.status === 'compliant' || activity.status === 'approved' || activity.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/screening')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Screen New Stock
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Purification
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Engine</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard