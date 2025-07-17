import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, ArrowLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const blink = createClient({
  projectId: 'amana-ai-compliance-engine-sa0jrixd',
  authRequired: true
})

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      if (state.user && !state.isLoading) {
        navigate('/dashboard')
      }
    })
    return unsubscribe
  }, [navigate])

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await blink.auth.login('/dashboard')
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to Amana AI
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to access your Shariah compliance dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">What you'll get access to:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                  Deep Shariah screening of stocks & ETFs
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                  Marketing material compliance review
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                  Precise purification calculations
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                  Full audit trails and reporting
                </li>
              </ul>
            </div>

            <Button 
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In to Continue'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm">Enterprise Security</h4>
                  <p className="text-blue-700 text-sm mt-1">
                    Your data is encrypted end-to-end and never used to train third-party models. 
                    Full compliance with Islamic finance data protection standards.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Need help? Contact our{' '}
            <a href="#" className="text-primary hover:underline">support team</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage