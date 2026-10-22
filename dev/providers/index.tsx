import { AuthProvider } from '@/providers/Auth'
import { HeaderThemeProvider } from '@/providers/HeaderTheme'
import { SonnerProvider } from '@/providers/Sonner'
import { ThemeProvider } from '@/providers/Theme'
import { EcommerceProvider } from '@payloadcms/plugin-ecommerce/client/react'
import { stripeAdapterClient } from '@payloadcms/plugin-ecommerce/payments/stripe'
import React from 'react'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HeaderThemeProvider>
          <SonnerProvider />
          <EcommerceProvider
            api={{
              cartsFetchQuery: {
                depth: 2,
                populate: {
                  products: {
                    slug: true,
                    gallery: true,
                    inventory: true,
                    title: true,
                  },
                  variants: {
                    inventory: true,
                    title: true,
                  },
                },
              },
            }}
            enableVariants={true}
            paymentMethods={[
              stripeAdapterClient({
                publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
              }),
            ]}
          >
            {children}
          </EcommerceProvider>
        </HeaderThemeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
