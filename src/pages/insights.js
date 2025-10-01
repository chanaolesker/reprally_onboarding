import { useEffect, useState } from 'react'
import Head from 'next/head'
import CompetitorPodium from '@/features/insights/components/CompetitorPodium'
import PageHeader from '@/features/insights/components/PageHeader'
import CTAButton from '@/features/insights/components/CTAButton'
import { useFormData } from '@/features/insights/hooks/useFormData'
import { useCompetitors } from '@/features/insights/hooks/useCompetitors'
import { layout } from '@/shared/styles/common'

export default function InsightsPage() {
  const [isClient, setIsClient] = useState(false)
  // Initialize as null so we don't render until session storage hydrates
  const { formData, hydrated } = useFormData(null)
  const { competitors, isLoading: isLoadingCompetitors, error: competitorError, retry } = useCompetitors(formData)

  useEffect(() => {
    setIsClient(true)
    // Only decide on redirect after hydration is complete
    if (hydrated && !formData) {
      // Redirect to main form if no data
      window.location.href = '/'
    }
  }, [formData, hydrated])

  // Avoid SSR flash and render only on client after hydration
  if (!isClient || !hydrated || !formData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          animation: 'spin 1s linear infinite',
          width: '32px',
          height: '32px',
          border: '2px solid #e5e7eb',
          borderTop: '2px solid #014c40',
          borderRadius: '50%'
        }}></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>RepRally Insights</title>
        <meta name="description" content="Your competitive insights and analytics" />
      </Head>
      
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={layout.container}>
          {/* Header */}
          <PageHeader 
            title={`${formData?.storeName || 'Your'} top competitors`}
          />

          {/* Podium Card */}
          <div style={layout.card}>
            {isLoadingCompetitors ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ 
                  animation: 'spin 1s linear infinite',
                  width: '32px',
                  height: '32px',
                  border: '2px solid #e5e7eb',
                  borderTop: '2px solid #014c40',
                  borderRadius: '50%',
                  margin: '0 auto 16px'
                }}></div>
                <p style={{ color: '#6b7280' }}>Analyzing your competitive landscape...</p>
              </div>
            ) : competitorError ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: '#dc2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                  Unable to Load Competitors
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>{competitorError}</p>
                <CTAButton onClick={retry}>
                  Try Again
                </CTAButton>
              </div>
            ) : (
              <CompetitorPodium 
                competitors={competitors} 
                userStoreName={formData.storeName}
                storeTypeName={formData.storeTypeName}
              />
            )}
          </div>

          {/* CTA Section */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <CTAButton href="https://app.reprally.com">
              Join RepRally and beat your competitors
            </CTAButton>
          </div>
        </div>
      </div>
    </>
  )
}