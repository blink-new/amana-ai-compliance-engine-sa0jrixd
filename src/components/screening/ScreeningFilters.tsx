import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { 
  Filter, 
  X, 
  RotateCcw,
  Globe,
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
  Target
} from 'lucide-react'

interface FilterProps {
  onFiltersChange: (filters: any) => void
  onClose: () => void
}

const ScreeningFilters: React.FC<FilterProps> = ({ onFiltersChange, onClose }) => {
  const [filters, setFilters] = useState({
    jurisdiction: 'AAOIFI',
    complianceStatus: [],
    sectors: [],
    marketCapRange: [1000000000, 3000000000000], // $1B to $3T
    complianceScoreRange: [0, 100],
    lastReviewedDays: 90,
    confidenceLevel: [],
    exchanges: [],
    includeETFs: false,
    includeREITs: false
  })

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
    'Automotive', 'Energy', 'Real Estate', 'Telecommunications',
    'Industrials', 'Materials', 'Utilities', 'Consumer Discretionary'
  ]

  const exchanges = [
    'NASDAQ', 'NYSE', 'LSE', 'TSE', 'HKEX', 'ASX', 'TSX', 'Euronext'
  ]

  const complianceStatuses = [
    { value: 'compliant', label: 'Compliant', color: 'bg-green-100 text-green-800' },
    { value: 'non_compliant', label: 'Non-Compliant', color: 'bg-red-100 text-red-800' },
    { value: 'review_needed', label: 'Review Needed', color: 'bg-yellow-100 text-yellow-800' }
  ]

  const confidenceLevels = [
    { value: 'high', label: 'High Confidence', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium Confidence', color: 'bg-orange-100 text-orange-800' },
    { value: 'low', label: 'Low Confidence', color: 'bg-gray-100 text-gray-800' }
  ]

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleArrayFilterChange = (key: string, value: string, checked: boolean) => {
    const currentArray = filters[key as keyof typeof filters] as string[]
    let newArray
    
    if (checked) {
      newArray = [...currentArray, value]
    } else {
      newArray = currentArray.filter(item => item !== value)
    }
    
    handleFilterChange(key, newArray)
  }

  const resetFilters = () => {
    const defaultFilters = {
      jurisdiction: 'AAOIFI',
      complianceStatus: [],
      sectors: [],
      marketCapRange: [1000000000, 3000000000000],
      complianceScoreRange: [0, 100],
      lastReviewedDays: 90,
      confidenceLevel: [],
      exchanges: [],
      includeETFs: false,
      includeREITs: false
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.complianceStatus.length > 0) count++
    if (filters.sectors.length > 0) count++
    if (filters.confidenceLevel.length > 0) count++
    if (filters.exchanges.length > 0) count++
    if (filters.includeETFs) count++
    if (filters.includeREITs) count++
    if (filters.jurisdiction !== 'AAOIFI') count++
    if (filters.lastReviewedDays !== 90) count++
    if (filters.marketCapRange[0] !== 1000000000 || filters.marketCapRange[1] !== 3000000000000) count++
    if (filters.complianceScoreRange[0] !== 0 || filters.complianceScoreRange[1] !== 100) count++
    return count
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <CardTitle>Advanced Filters</CardTitle>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          Refine your screening results with advanced criteria
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Jurisdiction */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Jurisdiction Standard</span>
          </Label>
          <Select value={filters.jurisdiction} onValueChange={(value) => handleFilterChange('jurisdiction', value)}>
            <SelectTrigger>
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
        </div>

        <Separator />

        {/* Compliance Status */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Compliance Status</span>
          </Label>
          <div className="space-y-2">
            {complianceStatuses.map((status) => (
              <div key={status.value} className="flex items-center space-x-2">
                <Checkbox
                  id={status.value}
                  checked={filters.complianceStatus.includes(status.value)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('complianceStatus', status.value, checked as boolean)
                  }
                />
                <Label htmlFor={status.value} className="flex-1">
                  <Badge variant="outline" className={status.color}>
                    {status.label}
                  </Badge>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Confidence Level */}
        <div className="space-y-3">
          <Label>Confidence Level</Label>
          <div className="space-y-2">
            {confidenceLevels.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <Checkbox
                  id={level.value}
                  checked={filters.confidenceLevel.includes(level.value)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('confidenceLevel', level.value, checked as boolean)
                  }
                />
                <Label htmlFor={level.value} className="flex-1">
                  <Badge variant="outline" className={level.color}>
                    {level.label}
                  </Badge>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Sectors */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Sectors</span>
          </Label>
          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
            {sectors.map((sector) => (
              <div key={sector} className="flex items-center space-x-2">
                <Checkbox
                  id={sector}
                  checked={filters.sectors.includes(sector)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('sectors', sector, checked as boolean)
                  }
                />
                <Label htmlFor={sector} className="text-sm">
                  {sector}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Market Cap Range */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Market Cap Range</span>
          </Label>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatMarketCap(filters.marketCapRange[0])}</span>
              <span>{formatMarketCap(filters.marketCapRange[1])}</span>
            </div>
            <Slider
              value={filters.marketCapRange}
              onValueChange={(value) => handleFilterChange('marketCapRange', value)}
              min={1000000000} // $1B
              max={3000000000000} // $3T
              step={10000000000} // $10B
              className="w-full"
            />
          </div>
        </div>

        <Separator />

        {/* Compliance Score Range */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Compliance Score Range</span>
          </Label>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{filters.complianceScoreRange[0]}%</span>
              <span>{filters.complianceScoreRange[1]}%</span>
            </div>
            <Slider
              value={filters.complianceScoreRange}
              onValueChange={(value) => handleFilterChange('complianceScoreRange', value)}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        <Separator />

        {/* Last Reviewed */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Last Reviewed (Days)</span>
          </Label>
          <Select 
            value={filters.lastReviewedDays.toString()} 
            onValueChange={(value) => handleFilterChange('lastReviewedDays', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Exchanges */}
        <div className="space-y-3">
          <Label>Exchanges</Label>
          <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto">
            {exchanges.map((exchange) => (
              <div key={exchange} className="flex items-center space-x-2">
                <Checkbox
                  id={exchange}
                  checked={filters.exchanges.includes(exchange)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('exchanges', exchange, checked as boolean)
                  }
                />
                <Label htmlFor={exchange} className="text-sm">
                  {exchange}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Asset Types */}
        <div className="space-y-3">
          <Label>Asset Types</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeETFs"
                checked={filters.includeETFs}
                onCheckedChange={(checked) => handleFilterChange('includeETFs', checked)}
              />
              <Label htmlFor="includeETFs">Include ETFs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeREITs"
                checked={filters.includeREITs}
                onCheckedChange={(checked) => handleFilterChange('includeREITs', checked)}
              />
              <Label htmlFor="includeREITs">Include REITs</Label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={resetFilters} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={onClose} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ScreeningFilters