'use client'

import { useRouter } from 'next/navigation'
import { Button, Flex, Heading, VStack, Text } from '@chakra-ui/react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { PredictionForm, PredictionResult } from '@/components'
import { getPredictionResult } from '@/redux/reducer/predict'
import { useSelector } from 'react-redux'

export default function NewPrediction() {
  const router = useRouter()
  const prediction = useSelector(getPredictionResult)

  return (
    <VStack p="2rem 8rem">
      <Flex w="full" justifyContent="space-between">
        <Heading as="h3" color="neutral" fontSize="1.5rem" fontWeight={700}>
          Nova Predição
        </Heading>

        <Button
          color="light"
          bgColor="darkSecondary"
          p="1rem"
          _hover={{ bgColor: 'secondary' }}
          onClick={() => router.push('dash')}
        >
          <IoArrowBackCircleOutline />
          <Text ml={2}>Voltar para Histórico</Text>
        </Button>
      </Flex>

      <PredictionForm />
      {prediction && <PredictionResult prediction={prediction} />}
    </VStack>
  )
}
