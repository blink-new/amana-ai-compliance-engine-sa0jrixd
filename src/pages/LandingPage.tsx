import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  FileText, 
  Calculator, 
  CheckCircle, 
  Globe, 
  Lock, 
  Users, 
  TrendingUp,
  ArrowRight,
  Star,
  Building2,
  Zap,
  Eye,
  BookOpen,
  Award,
  Database,
  Brain,
  Target
} from 'lucide-react'

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Shield,
      title: "Deep Shariah Stock Screening",
      description: "AI agents analyze complex financial structures, segment-level data, and footnote disclosures that traditional rule-based systems miss",
      details: "Go beyond surface-level ratios. Our AI parses complex financial statements, identifies hidden revenue streams, analyzes business model changes, and tracks compliance across subsidiaries. We provide dynamic, context-aware screening that adapts to evolving business structures."
    },
    {
      icon: FileText,
      title: "Marketing Material Review",
      description: "NLP-powered compliance review of marketing materials with suggested corrections",
      details: "Upload PDFs, PPTs, and DOCs for automated scanning. Our NLP engine flags non-compliant phrases, suggests compliant language, and provides side-by-side editing with version control."
    },
    {
      icon: Calculator,
      title: "Purification Calculations",
      description: "Precise purification and zakat calculations with multiple methodologies",
      details: "Identify and quantify non-compliant income within portfolios. Calculate zakat and purification amounts using AAOIFI, madhhab-based, or custom methodologies with detailed reporting."
    }
  ]

  const jurisdictions = [
    { name: "AAOIFI", flag: "🌍", description: "Default Standard" },
    { name: "Malaysia", flag: "🇲🇾", description: "SC Malaysia, SAC BNM" },
    { name: "Indonesia", flag: "🇮🇩", description: "DSN-MUI" },
    { name: "Saudi Arabia", flag: "🇸🇦", description: "CMA Standards" },
    { name: "UAE", flag: "🇦🇪", description: "SCA Guidelines" },
    { name: "Qatar", flag: "🇶🇦", description: "QFMA Rules" }
  ]

  const testimonials = [
    {
      name: "Dr. Ahmed Al-Rashid",
      role: "Chief Shariah Officer",
      company: "Leading Islamic Banking Group, Saudi Arabia",
      content: "Amana AI transformed our entire compliance workflow. The multi-jurisdictional support and comprehensive audit trails give us unparalleled confidence in our Shariah screening decisions.",
      rating: 5
    },
    {
      name: "Fatima Hassan",
      role: "Compliance Director", 
      company: "Premier Islamic Fund House, Malaysia",
      content: "We've cut compliance review time by 80% while dramatically improving accuracy. This isn't just a tool—it's become essential infrastructure for our operations.",
      rating: 5
    },
    {
      name: "Mohammad Zubair",
      role: "Fund Manager",
      company: "Leading Islamic Investment House, UAE",
      content: "The precision of purification calculations is remarkable. We now deliver detailed, audit-ready purification reports to investors instantly—something that used to take weeks.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-primary">Amana AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#jurisdictions" className="text-gray-600 hover:text-primary transition-colors">Coverage</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</a>
              <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered
              <span className="text-primary block">Shariah Compliance</span>
              <span className="text-accent">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Screen investments, review marketing materials, and calculate purifications 
              with institutional-grade precision. Built for regulated Islamic finance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Eye className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-accent" />
                Enterprise Security
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-accent" />
                AAOIFI Compliant
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-accent" />
                Multi-Jurisdictional
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-accent" />
                Full Audit Trails
              </div>
              <div className="flex items-center">
                <Database className="w-4 h-4 mr-2 text-accent" />
                S&P Capital IQ & AlphaSense
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Shariah Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three AI-powered modules that transform how Islamic financial institutions 
              manage compliance, risk, and regulatory requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'border-primary shadow-lg bg-primary/5' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeFeature === index ? 'bg-primary text-white' : 'bg-gray-100'
                      }`}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary rounded-lg">
                  {React.createElement(features[activeFeature].icon, { 
                    className: "w-6 h-6 text-white" 
                  })}
                </div>
                <h3 className="text-2xl font-semibold">{features[activeFeature].title}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {features[activeFeature].details}
              </p>
              <div className="flex items-center space-x-4">
                <Button className="bg-primary hover:bg-primary/90">
                  Try This Feature
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jurisdictions Section */}
      <section id="jurisdictions" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Shariah Standards Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AAOIFI-compliant by default, with intelligent overlays for local requirements 
              across every major Islamic finance jurisdiction worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jurisdictions.map((jurisdiction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{jurisdiction.flag}</div>
                  <CardTitle className="text-lg">{jurisdiction.name}</CardTitle>
                  <CardDescription>{jurisdiction.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Supported
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Islamic Institutions
            </h2>
            <p className="text-xl text-gray-600">
              Join the compliance officers and Shariah scholars who rely on Amana AI daily
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Revolutionize Your Compliance?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join leading Islamic institutions using AI to streamline Shariah compliance, 
            reduce risk, and scale with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Zap className="mr-2 w-5 h-5" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">Amana AI</span>
              </div>
              <p className="text-gray-400">
                Enterprise-grade Shariah compliance platform for Islamic financial institutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Shariah Screening</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketing Review</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Purification Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Amana AI. All rights reserved. Built for Islamic financial institutions worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage