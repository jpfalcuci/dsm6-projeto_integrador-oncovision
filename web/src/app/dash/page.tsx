'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { LuCirclePlus } from 'react-icons/lu'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { DashTable, LoadingSpinner } from '@/components'
import { AppServices } from '@/service/app-services'
import { AppDispatch } from '@/redux/store'
import { resetState } from '@/redux/reducer/predict'
import { isAuthenticated } from '@/hooks/useLocalStorage'
import { HistoryPayload } from '@/models'
import { toaster } from '@/components/ui/toaster'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const [history, setHistory] = useState<HistoryPayload>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getHistoryData = useCallback(async () => {
    if (!isAuthenticated()) {
      toaster.create({
        title: 'Atenção',
        description: `Usuário não logado!`,
        type: 'warning',
      })
      return router.push('login')
    }
    setIsLoading(true)
    try {
      const response = await AppServices.getHistory()
      setHistory(response.data)
    } catch (error) {
      console.error(error)
      toaster.create({
        title: 'Erro',
        description: `Não foi possível carregar o histórico.`,
        type: 'warning',
      })
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    getHistoryData()
  }, [getHistoryData])

  return (
    <Box w="full" p="2rem 8rem" maxH="calc(100vh - 8rem)">
      <Flex justifyContent="space-between">
        <Heading as="h3" color="dark" fontSize="1.5rem" fontWeight={700}>
          Histórico de Predições
        </Heading>

        <Button
          color="light"
          bgColor="darkSecondary"
          p="1rem 2rem"
          _hover={{ bgColor: 'secondary' }}
          onClick={() => {
            dispatch(resetState())
            router.push('new-prediction')
          }}
        >
          <LuCirclePlus />
          <Text ml={2}>Nova Predição</Text>
        </Button>
      </Flex>

      {isLoading ? (
        <LoadingSpinner />
      ) : history?.history.length ? (
        <Box
          w="full"
          mt="2rem"
          overflowX="auto"
          border="2px solid #4a5568"
          borderRadius="0.5rem"
          maxH="calc(100vh - 16rem)"
          h="100%"
        >
          <DashTable history={history.history} />
        </Box>
      ) : (
        <Text color="dark" textAlign="center" mt="12rem">
          Não há histórico de predições
        </Text>
      )}
    </Box>
  )
}
