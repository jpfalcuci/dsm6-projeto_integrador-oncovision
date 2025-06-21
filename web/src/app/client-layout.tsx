'use client'

import { usePathname } from 'next/navigation'
import { Flex } from '@chakra-ui/react'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideHeader = ['/', '/login', '/sign-up'].includes(pathname)
  const hideStyles = ['/dash', '/new-prediction'].includes(pathname)

  return (
    <ReduxProvider store={store}>
      <Provider>
        {!hideHeader && <Header />}
        <Flex
          bg={
            !hideStyles
              ? 'linear-gradient(#e84c8835,rgba(194, 58, 108, 0.09))'
              : undefined
          }
          h={hideStyles ? '' : '100vh'}
          w="100%"
          overflowX="hidden"
          justifyContent="center"
          alignItems="center"
        >
          {children}
          <Toaster />
        </Flex>
      </Provider>
    </ReduxProvider>
  )
}
