import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import theme from '../styles/theme'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  }
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Handle route changes
    const handleRouteChange = (url: string) => {
      console.log('Route changing to:', url)
    }

    const handleRouteChangeComplete = (url: string) => {
      console.log('Route change completed:', url)
    }

    const handleRouteChangeError = (err: any, url: string) => {
      console.error('Route change error:', { url, err })
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router])

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default MyApp 