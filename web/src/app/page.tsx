'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'

import logo from '../../public/logo.svg'

export default function Home() {
  const router = useRouter()
  return (
    <Flex
      h="100vh"
      w="100%"
      overflowX="hidden"
      justifyContent={'center'}
      alignItems="center"
    >
      <VStack>
        <Flex
          w="20rem"
          h="auto"
          bgColor="rgba(255, 255, 255, 0.15)"
          backdropBlur="10px"
          p="2rem"
          border="1px solid rgba(255, 255, 255, 0.09)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          borderRadius="50%"
          justifyContent="center"
        >
          <Image src={logo} alt="logo" width={160} />
        </Flex>
        <Text color="primary" fontSize="3rem" fontWeight={600}>
          OncoVision
        </Text>
        <Text color="primaryDark" fontSize="1.25rem" mt="-1.5rem">
          Breast Cancer Detection
        </Text>

        <HStack mt="2rem" gap="2rem">
          <Button
            w="10rem"
            borderRadius="1rem"
            bgColor="primaryDark"
            _hover={{ bgColor: 'primary' }}
            color="primaryLight"
            onClick={() => router.push('/sign-up')}
          >
            Criar Conta
          </Button>
          <Button
            w="10rem"
            borderRadius="1rem"
            bgColor="primaryDark"
            _hover={{ bgColor: 'primary' }}
            color="primaryLight"
            onClick={() => router.push('/login')}
          >
            Entrar
          </Button>
        </HStack>

        <Box maxW="30rem" mt="2.5rem" textAlign="center" p="0 1rem">
          <Text fontSize="1.25rem" fontWeight={500} color="secondary">
            Bem-vindo ao OncoVision!
          </Text>
          <Text fontWeight={400} color="secondary" mt="0.75rem">
            Oferecemos uma plataforma inovadora que utiliza inteligência
            artificial para auxiliar na identificação precoce do câncer de mama,
            promovendo diagnósticos mais rápidos, eficazes e confiáveis.
          </Text>
        </Box>
      </VStack>
    </Flex>
  )
}
