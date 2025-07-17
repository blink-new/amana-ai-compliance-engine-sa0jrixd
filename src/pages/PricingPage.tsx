import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Check, 
  X, 
  ArrowRight, 
  Shield, 
  FileText, 
  Calculator, 
  Users, 
  Zap, 
  Globe, 
  Lock, 
  Phone,
  Mail,
  Star,
  Building2,
  Brain,
  Eye,
  Crown,
  Sparkles,
  Target,
  TrendingUp,
  Database,
  BookOpen,
  Award,
  Headphones
} from 'lucide-react'

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true)

  // Bundle Plans
  const bundlePlans = [
    {
      name: "Starter",
      description: "For small teams & early fintechs",
      monthlyPrice: 1000,
      annualPrice: 10000,
      savings: "2 months free",
      features: [
        "Access to all 3 modules",
        "2 user seats",
        "50 API calls/month",
        "Portfolio-wide screening",
        "Basic alerts & monitoring",
        "Standard audit reports",
        "Email support",
        "AAOIFI compliance",
        "Basic purification calculations"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      description: "For DFMs & robo-advisors",
      monthlyPrice: 2500,
      annualPrice: 25000,
      savings: "2 months free",
      features: [
        "Everything in Starter",
        "5 user seats",
        "250 API calls/month",
        "Multi-jurisdictional overlays",
        "Real-time monitoring",
        "Advanced audit trails",
        "Priority support",
        "Custom compliance rules",
        "Bulk screening capabilities",
        "Advanced purification methods",
        "Marketing material review",
        "White-label reports"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For banks & large funds",
      monthlyPrice: 5000,
      annualPrice: null,
      customPricing: true,
      features: [
        "Everything in Professional",
        "10+ user seats",
        "Unlimited API calls",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "On-premise deployment",
        "Custom Shariah rules engine",
        "Advanced analytics dashboard",
        "Multi-tenant architecture",
        "SSO & LDAP integration",
        "Custom SLA agreements"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  // Individual Modules
  const modules = [
    {
      name: "Stock & ETF Screening",
      icon: Shield,
      monthlyPrice: 1500,
      annualPrice: 15000,
      description: "AI-powered Shariah screening with deep financial analysis",
      features: [
        "Business & financial screening",
        "AI-powered document parsing",
        "Multi-jurisdictional support",
        "Real-time compliance monitoring",
        "Purification export",
        "Full Shariah audit trail",
        "API integration",
        "Custom screening rules"
      ],
      useCase: "Ideal for fund managers and investment advisors",
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Marketing Material Review",
      icon: FileText,
      monthlyPrice: 1000,
      annualPrice: 10000,
      description: "NLP-based screening of marketing materials for Shariah compliance",
      features: [
        "PDF, PPT, DOC support",
        "LLM-based content analysis",
        "Haram/non-compliant flagging",
        "Suggested corrections",
        "Side-by-side editor",
        "Version control",
        "Compliance scoring",
        "Multi-language support"
      ],
      useCase: "Ideal for asset managers, banks, and ETF providers",
      color: "bg-green-50 border-green-200"
    },
    {
      name: "Purification Engine",
      icon: Calculator,
      monthlyPrice: 800,
      annualPrice: 8000,
      description: "Precise purification and zakat calculations with multiple methodologies",
      features: [
        "Complex purification calculations",
        "Historical analysis",
        "Forensic purification",
        "Multiple methodologies",
        "Per-share reports",
        "Zakat calculations",
        "Audit-ready documentation",
        "Bulk processing"
      ],
      useCase: "Ideal for ETFs and legacy fund holdings",
      color: "bg-purple-50 border-purple-200"
    }
  ]

  // Feature comparison data
  const comparisonFeatures = [
    { name: "User Seats", starter: "2", professional: "5", enterprise: "10+" },
    { name: "API Calls/Month", starter: "50", professional: "250", enterprise: "Unlimited" },
    { name: "Shariah Screening", starter: true, professional: true, enterprise: true },
    { name: "Marketing Review", starter: true, professional: true, enterprise: true },
    { name: "Purification Calculator", starter: true, professional: true, enterprise: true },
    { name: "Multi-jurisdictional Support", starter: false, professional: true, enterprise: true },
    { name: "Real-time Monitoring", starter: false, professional: true, enterprise: true },
    { name: "Custom Rules Engine", starter: false, professional: false, enterprise: true },
    { name: "White-label Reports", starter: false, professional: true, enterprise: true },
    { name: "On-premise Deployment", starter: false, professional: false, enterprise: true },
    { name: "24/7 Phone Support", starter: false, professional: false, enterprise: true },
    { name: "Dedicated Account Manager", starter: false, professional: false, enterprise: true }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-primary">Amana AI</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
              <Link to="/#features" className="text-gray-600 hover:text-primary transition-colors">Features</Link>
              <a href="#pricing" className="text-primary font-medium">Pricing</a>
              <Link to="/#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden sm:inline-flex">
                <Phone className="w-4 h-4 mr-2" />
                Book Demo
              </Button>
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

      {/* Header Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Flexible Pricing for
            <span className="text-primary block">Institutions of All Sizes</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access cutting-edge AI tools for Shariah compliance, purification, and automated reviews — 
            all in one platform.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg ${!isAnnual ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-lg ${isAnnual ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Annual
            </span>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Eye className="mr-2 w-5 h-5" />
              Book a Demo
            </Button>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bundle Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Platform Access
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get access to all three modules with our comprehensive bundles. 
              Perfect for institutions that need full Shariah compliance coverage.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {bundlePlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : 'border-gray-200'} transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1 text-sm font-medium">
                      <Crown className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                  
                  <div className="mt-6">
                    {plan.customPricing ? (
                      <div className="text-4xl font-bold text-gray-900">Custom</div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-gray-900">
                          {formatPrice(isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice)}
                          <span className="text-lg font-normal text-gray-500">/month</span>
                        </div>
                        {isAnnual && (
                          <div className="text-sm text-gray-500 mt-1">
                            Billed annually ({formatPrice(plan.annualPrice)})
                          </div>
                        )}
                      </>
                    )}
                    {isAnnual && plan.savings && (
                      <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                        {plan.savings}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                    {plan.cta === 'Start Free Trial' && <ArrowRight className="ml-2 w-4 h-4" />}
                    {plan.cta === 'Contact Sales' && <Mail className="ml-2 w-4 h-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Feature Comparison</h3>
              <p className="text-gray-600 mt-1">Compare what's included in each plan</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Features</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-900">Starter</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-900">Professional</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-4 px-6 font-medium text-gray-900">{feature.name}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.starter === 'boolean' ? (
                          feature.starter ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600">{feature.starter}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.professional === 'boolean' ? (
                          feature.professional ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600">{feature.professional}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600">{feature.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modular Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Individual Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Just need one part of the platform? You can subscribe to individual modules 
              separately or combine two at a discount.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {modules.map((module, index) => (
              <Card key={index} className={`${module.color} border-2 hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <module.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{module.name}</CardTitle>
                  <CardDescription className="text-base mt-2">{module.description}</CardDescription>
                  
                  <div className="mt-6">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(isAnnual ? module.annualPrice / 12 : module.monthlyPrice)}
                      <span className="text-lg font-normal text-gray-500">/month</span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-gray-500 mt-1">
                        Billed annually ({formatPrice(module.annualPrice)})
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-white/80 rounded-lg p-3 mb-6">
                    <p className="text-sm text-gray-600 italic">{module.useCase}</p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <Sparkles className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Mix & Match Savings</h3>
              <p className="text-lg mb-6 opacity-90">
                Need 2 modules? Get <span className="font-bold">15% off</span>. 
                All 3 modules? Save <span className="font-bold">30-40%</span> with a bundle plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Calculator className="mr-2 w-5 h-5" />
                  Calculate Savings
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 w-5 h-5" />
                  Speak with Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security & Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for regulated financial institutions with the highest security and compliance standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lock,
                title: "SOC 2 Compliant",
                description: "Enterprise-grade security with full audit trails"
              },
              {
                icon: Shield,
                title: "Data Encryption",
                description: "End-to-end encryption at rest and in transit"
              },
              {
                icon: Globe,
                title: "Global Deployment",
                description: "Cloud or on-premise deployment options"
              },
              {
                icon: Award,
                title: "99.9% Uptime SLA",
                description: "Guaranteed availability for mission-critical operations"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and platform
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "What's included in the free trial?",
                answer: "The 30-day free trial includes full access to all three modules with up to 25 API calls and 2 user seats. No credit card required."
              },
              {
                question: "Can I switch between plans?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
              },
              {
                question: "Do you offer custom enterprise solutions?",
                answer: "Absolutely. Our Enterprise plan includes custom integrations, on-premise deployment, and dedicated support. Contact our sales team for a tailored solution."
              },
              {
                question: "What jurisdictions do you support?",
                answer: "We support AAOIFI standards by default, with overlay support for Malaysia (SC Malaysia, SAC BNM), Indonesia (DSN-MUI), and GCC countries."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we maintain enterprise-grade security with SOC 2 compliance, end-to-end encryption, and ensure your data is never used to train third-party models."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Compliance Process?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join leading Islamic financial institutions using Amana AI for next-generation 
            Shariah compliance intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100">
                <Zap className="mr-2 w-5 h-5" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              <Headphones className="mr-2 w-5 h-5" />
              Schedule Demo
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              30-day free trial
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              Cancel anytime
            </div>
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
                <li><Link to="/screening" className="hover:text-white transition-colors">Shariah Screening</Link></li>
                <li><Link to="/marketing-review" className="hover:text-white transition-colors">Marketing Review</Link></li>
                <li><Link to="/purification" className="hover:text-white transition-colors">Purification Calculator</Link></li>
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
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Amana AI. All rights reserved. Built for Islamic financial institutions worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PricingPage