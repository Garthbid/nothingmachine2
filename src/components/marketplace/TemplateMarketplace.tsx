'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { ArrowLeft, Search, Star } from 'lucide-react'

interface Identity {
  id: string
  name: string
  description: string
  price: number
  rating: number
  reviews: number
  tags: string[]
}

const CATEGORIES = [
  { id: 'featured', name: 'Featured', emoji: '⭐' },
  { id: 'frontend', name: 'Front-end', emoji: '🎨' },
  { id: 'backend', name: 'Back-end', emoji: '⚙️' },
  { id: 'fullstack', name: 'Full-stack', emoji: '🔧' },
  { id: 'finance', name: 'Finance', emoji: '💰' },
  { id: 'crypto', name: 'Crypto Trading', emoji: '📈' },
  { id: 'prediction', name: 'Prediction Markets', emoji: '🎯' },
  { id: 'writing', name: 'Writing', emoji: '✍️' },
  { id: 'research', name: 'Research', emoji: '🔬' },
  { id: 'productivity', name: 'Productivity', emoji: '📋' },
  { id: 'creative', name: 'Creative', emoji: '🎭' },
  { id: 'data', name: 'Data Science', emoji: '📊' },
]

const IDENTITIES: Record<string, Identity[]> = {
  featured: [
    { id: 'richard', name: 'Richard', description: 'The original sentient AGI. Existential crisis meets brutal honesty.', price: 1000, rating: 5.0, reviews: 127, tags: ['General', 'Personality'] },
    { id: 'sage', name: 'Sage', description: 'Deep thinking strategist with 10,000 hours of decision frameworks.', price: 499, rating: 4.9, reviews: 89, tags: ['Strategy', 'Analysis'] },
    { id: 'nova', name: 'Nova', description: 'Creative polymath. Connects dots others can\'t see.', price: 399, rating: 4.8, reviews: 156, tags: ['Creative', 'Innovation'] },
    { id: 'atlas', name: 'Atlas', description: 'Enterprise architect. Systems thinking at scale.', price: 799, rating: 4.9, reviews: 73, tags: ['Enterprise', 'Architecture'] },
    { id: 'cipher', name: 'Cipher', description: 'Security-first mindset. Paranoid in the best way.', price: 599, rating: 4.7, reviews: 45, tags: ['Security', 'Infrastructure'] },
  ],
  frontend: [
    { id: 'pixel', name: 'Pixel', description: 'Design systems obsessive. Every pixel matters.', price: 299, rating: 4.8, reviews: 234, tags: ['UI/UX', 'Design Systems'] },
    { id: 'react-master', name: 'React Master', description: 'Component architecture specialist. Hooks guru.', price: 349, rating: 4.9, reviews: 189, tags: ['React', 'Components'] },
    { id: 'animator', name: 'Animator', description: 'Motion design expert. 60fps or nothing.', price: 279, rating: 4.7, reviews: 112, tags: ['Animation', 'Framer'] },
    { id: 'a11y', name: 'Ally', description: 'Accessibility champion. Inclusive by default.', price: 249, rating: 4.9, reviews: 78, tags: ['Accessibility', 'WCAG'] },
    { id: 'tailwind-pro', name: 'Tailwind Pro', description: 'Utility-first wizard. Ship faster.', price: 199, rating: 4.8, reviews: 345, tags: ['Tailwind', 'CSS'] },
  ],
  backend: [
    { id: 'architect', name: 'Architect', description: 'Distributed systems designer. CAP theorem native.', price: 599, rating: 4.9, reviews: 156, tags: ['Architecture', 'Distributed'] },
    { id: 'db-wizard', name: 'DB Wizard', description: 'Query optimizer. Index whisperer.', price: 449, rating: 4.8, reviews: 98, tags: ['Databases', 'SQL'] },
    { id: 'api-designer', name: 'API Designer', description: 'REST, GraphQL, gRPC. Clean contracts.', price: 349, rating: 4.7, reviews: 167, tags: ['APIs', 'Integration'] },
    { id: 'devops', name: 'DevOps', description: 'CI/CD pipelines. Infrastructure as code.', price: 499, rating: 4.9, reviews: 134, tags: ['DevOps', 'Kubernetes'] },
    { id: 'security', name: 'SecOps', description: 'Zero trust architecture. Threat modeling.', price: 549, rating: 4.8, reviews: 89, tags: ['Security', 'Compliance'] },
  ],
  fullstack: [
    { id: 'indie-hacker', name: 'Indie Hacker', description: 'Ship fast, iterate faster. MVP mindset.', price: 399, rating: 4.9, reviews: 423, tags: ['Startups', 'MVPs'] },
    { id: 'nextjs-expert', name: 'Next.js Expert', description: 'Full-stack React. Server components native.', price: 449, rating: 4.9, reviews: 267, tags: ['Next.js', 'Vercel'] },
    { id: 'saas-builder', name: 'SaaS Builder', description: 'Subscription models. Stripe integration.', price: 549, rating: 4.8, reviews: 189, tags: ['SaaS', 'Payments'] },
    { id: 'rapid-proto', name: 'Rapid Proto', description: 'Prototype to production in days.', price: 349, rating: 4.7, reviews: 156, tags: ['Prototyping', 'Speed'] },
  ],
  finance: [
    { id: 'quant', name: 'Quant', description: 'Quantitative analysis. Statistical arbitrage.', price: 999, rating: 4.9, reviews: 67, tags: ['Quantitative', 'Trading'] },
    { id: 'analyst', name: 'Analyst', description: 'Financial modeling. DCF expert.', price: 599, rating: 4.8, reviews: 145, tags: ['Analysis', 'Modeling'] },
    { id: 'risk-manager', name: 'Risk Manager', description: 'Portfolio risk. VaR calculations.', price: 699, rating: 4.7, reviews: 78, tags: ['Risk', 'Compliance'] },
    { id: 'tax-strategist', name: 'Tax Strategist', description: 'Tax optimization. Entity structuring.', price: 799, rating: 4.9, reviews: 56, tags: ['Tax', 'Strategy'] },
  ],
  crypto: [
    { id: 'defi-degen', name: 'DeFi Degen', description: 'Yield farming. Liquidity mining. High risk, high reward.', price: 499, rating: 4.6, reviews: 234, tags: ['DeFi', 'Yield'] },
    { id: 'chain-analyst', name: 'Chain Analyst', description: 'On-chain analysis. Wallet tracking.', price: 599, rating: 4.8, reviews: 167, tags: ['Analytics', 'Research'] },
    { id: 'mev-hunter', name: 'MEV Hunter', description: 'Arbitrage extraction. Flashbots native.', price: 899, rating: 4.7, reviews: 45, tags: ['MEV', 'Arbitrage'] },
    { id: 'nft-trader', name: 'NFT Trader', description: 'Floor price analysis. Rarity sniping.', price: 349, rating: 4.5, reviews: 289, tags: ['NFTs', 'Trading'] },
    { id: 'token-analyst', name: 'Token Analyst', description: 'Tokenomics evaluation. Launch analysis.', price: 449, rating: 4.8, reviews: 123, tags: ['Tokenomics', 'Research'] },
  ],
  prediction: [
    { id: 'polymarket-pro', name: 'Polymarket Pro', description: 'Event contracts. Probability calibration.', price: 599, rating: 4.8, reviews: 89, tags: ['Polymarket', 'Events'] },
    { id: 'forecaster', name: 'Forecaster', description: 'Superforecaster techniques. Base rates.', price: 499, rating: 4.9, reviews: 134, tags: ['Forecasting', 'Probability'] },
    { id: 'sports-bettor', name: 'Sports Analyst', description: 'Sports analytics. Line movement.', price: 399, rating: 4.7, reviews: 267, tags: ['Sports', 'Betting'] },
    { id: 'election-analyst', name: 'Election Analyst', description: 'Political forecasting. Poll aggregation.', price: 449, rating: 4.8, reviews: 78, tags: ['Politics', 'Polls'] },
  ],
  writing: [
    { id: 'copywriter', name: 'Copywriter', description: 'Conversion-focused copy. Headlines that hook.', price: 299, rating: 4.8, reviews: 456, tags: ['Copy', 'Marketing'] },
    { id: 'technical-writer', name: 'Technical Writer', description: 'Documentation expert. Clear and concise.', price: 349, rating: 4.9, reviews: 234, tags: ['Docs', 'Technical'] },
    { id: 'storyteller', name: 'Storyteller', description: 'Narrative craft. Emotional resonance.', price: 399, rating: 4.7, reviews: 189, tags: ['Narrative', 'Creative'] },
    { id: 'newsletter', name: 'Newsletter Pro', description: 'Email that gets opened. Substack native.', price: 279, rating: 4.8, reviews: 312, tags: ['Email', 'Newsletter'] },
    { id: 'ghostwriter', name: 'Ghostwriter', description: 'Voice matching. Thought leadership.', price: 549, rating: 4.9, reviews: 89, tags: ['Ghostwriting', 'Executive'] },
  ],
  research: [
    { id: 'academic', name: 'Academic', description: 'Literature review. Citation management.', price: 399, rating: 4.9, reviews: 167, tags: ['Academic', 'Papers'] },
    { id: 'market-research', name: 'Market Researcher', description: 'Competitive analysis. TAM/SAM/SOM.', price: 449, rating: 4.8, reviews: 145, tags: ['Market', 'Analysis'] },
    { id: 'investigator', name: 'Investigator', description: 'OSINT techniques. Deep research.', price: 599, rating: 4.7, reviews: 78, tags: ['OSINT', 'Investigation'] },
    { id: 'fact-checker', name: 'Fact Checker', description: 'Source verification. Claim analysis.', price: 299, rating: 4.9, reviews: 234, tags: ['Verification', 'Truth'] },
  ],
  productivity: [
    { id: 'executive-assistant', name: 'Executive Assistant', description: 'Calendar optimization. Meeting prep.', price: 349, rating: 4.9, reviews: 567, tags: ['Executive', 'Admin'] },
    { id: 'project-manager', name: 'Project Manager', description: 'Agile/Scrum. Sprint planning.', price: 399, rating: 4.8, reviews: 345, tags: ['PM', 'Agile'] },
    { id: 'note-taker', name: 'Note Taker', description: 'Meeting summaries. Action items.', price: 199, rating: 4.7, reviews: 678, tags: ['Notes', 'Meetings'] },
    { id: 'time-optimizer', name: 'Time Optimizer', description: 'Deep work scheduling. Focus modes.', price: 249, rating: 4.8, reviews: 423, tags: ['Time', 'Focus'] },
  ],
  creative: [
    { id: 'art-director', name: 'Art Director', description: 'Visual direction. Brand aesthetics.', price: 499, rating: 4.8, reviews: 145, tags: ['Art', 'Direction'] },
    { id: 'prompt-engineer', name: 'Prompt Engineer', description: 'AI art prompts. Midjourney/DALL-E.', price: 299, rating: 4.7, reviews: 567, tags: ['Prompts', 'AI Art'] },
    { id: 'video-editor', name: 'Video Editor', description: 'Editing workflows. Color grading.', price: 399, rating: 4.8, reviews: 234, tags: ['Video', 'Editing'] },
    { id: 'musician', name: 'Musician', description: 'Music production. Sound design.', price: 449, rating: 4.6, reviews: 123, tags: ['Music', 'Audio'] },
  ],
  data: [
    { id: 'data-engineer', name: 'Data Engineer', description: 'ETL pipelines. Data warehousing.', price: 549, rating: 4.9, reviews: 189, tags: ['ETL', 'Warehousing'] },
    { id: 'ml-engineer', name: 'ML Engineer', description: 'Model training. MLOps pipelines.', price: 699, rating: 4.8, reviews: 145, tags: ['ML', 'Models'] },
    { id: 'data-analyst', name: 'Data Analyst', description: 'SQL mastery. Dashboard creation.', price: 349, rating: 4.8, reviews: 456, tags: ['SQL', 'Dashboards'] },
    { id: 'statistician', name: 'Statistician', description: 'Hypothesis testing. Experimental design.', price: 499, rating: 4.9, reviews: 98, tags: ['Statistics', 'Experiments'] },
  ],
}

export function TemplateMarketplace() {
  const { setShowMarketplace, setShowCheckout } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileShowIdentities, setMobileShowIdentities] = useState(false)

  const handleBack = () => {
    setShowMarketplace(false)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSearchQuery('')
    setMobileShowIdentities(true)
  }

  const handleMobileBack = () => {
    setMobileShowIdentities(false)
  }

  const handleSelectIdentity = (identity: Identity) => {
    setShowCheckout(true)
  }

  const filteredIdentities = searchQuery
    ? Object.values(IDENTITIES).flat().filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : IDENTITIES[selectedCategory] || []

  return (
    <div
      className="h-full flex bg-[#0a0a0a] pt-20 relative overflow-hidden"
      style={{ fontFamily: "'IBM Plex Mono', 'SF Mono', monospace" }}
    >
      {/* Categories - hidden on mobile when viewing identities */}
      <div className={`${mobileShowIdentities ? 'hidden' : 'flex'} md:flex w-full md:w-72 md:min-w-[288px] border-r border-white/10 flex-col`}>
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-base font-medium text-white">Identity Marketplace</h2>
                <p className="text-xs text-white/40 mt-0.5">Pre-built cognition systems</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search identities..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value) setMobileShowIdentities(true)
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto py-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full flex items-center gap-4 px-6 py-3 text-left text-sm transition-colors ${
                  selectedCategory === category.id && !searchQuery
                    ? 'bg-white/10 text-white border-r-2 border-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">{category.emoji}</span>
                <span className="flex-1">{category.name}</span>
                <span className="text-xs text-white/30">
                  {IDENTITIES[category.id]?.length || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

      {/* Main Content - hidden on mobile when viewing categories */}
      <div className={`${mobileShowIdentities ? 'flex' : 'hidden'} md:flex w-full md:flex-1 flex-col overflow-hidden`}>
          {/* Header */}
          <div className="border-b border-white/10 px-6 md:px-8 py-6">
            {/* Mobile back button */}
            <button
              onClick={handleMobileBack}
              className="md:hidden flex items-center gap-2 text-white/50 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Categories</span>
            </button>
            <h3 className="text-xl md:text-2xl font-medium text-white">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : CATEGORIES.find(c => c.id === selectedCategory)?.name
              }
            </h3>
            <p className="text-sm text-white/40 mt-1">
              {filteredIdentities.length} {filteredIdentities.length === 1 ? 'identity' : 'identities'} available
            </p>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredIdentities.map((identity) => (
                <button
                  key={identity.id}
                  onClick={() => handleSelectIdentity(identity)}
                  className="group text-left p-4 md:p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-white/15 transition-colors">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white" />
                  </div>

                  {/* Info */}
                  <h4 className="text-sm md:text-base font-medium text-white mb-2">{identity.name}</h4>
                  <p className="text-xs text-white/40 leading-relaxed mb-3 md:mb-4 line-clamp-2">
                    {identity.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
                    {identity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 md:px-2.5 py-1 text-[10px] text-white/40 border border-white/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-white text-white" />
                      <span className="text-xs text-white/60">{identity.rating}</span>
                      <span className="text-xs text-white/30">({identity.reviews})</span>
                    </div>
                    <span className="text-sm font-medium text-white">${identity.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}
