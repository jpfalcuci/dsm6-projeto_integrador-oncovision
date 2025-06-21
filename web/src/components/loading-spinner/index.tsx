import { Flex, Spinner } from '@chakra-ui/react'

export const LoadingSpinner = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mt="12rem">
      <Spinner size="xl" color="dark" />
    </Flex>
  )
}
