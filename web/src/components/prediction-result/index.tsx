import { PredictResult } from '@/models'
import { Heading, Text, Box, HStack } from '@chakra-ui/react'

export const PredictionResult = ({ prediction }: PredictResult) => {
  const isBenign = prediction === 'Benigno'
  return (
    <Box
      w="full"
      mt="2rem"
      p="2rem"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      borderBottomLeftRadius="0.5rem"
      borderBottomRightRadius="0.5rem"
    >
      <Heading as="h3" color="neutral" textAlign="start">
        Resultado da predição:
      </Heading>
      
      <HStack justifyContent="center">
        <Text
          textAlign="center"
          w="fit-content"
          p="0.5rem 4rem"
          color={`${isBenign ? 'success' : 'error'}`}
          bg={isBenign ? 'badgeBenign' : 'badgeMalignant'}
          border={`2px solid ${isBenign ? '#48bb78' : '#e53e3e'}`}
          borderRadius="0.5rem"
          mt="1.5rem"
          fontSize="1.75rem"
          fontWeight={700}
        >
          {prediction}
        </Text>
      </HStack>
    </Box>
  )
}
