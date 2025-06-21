'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SlLogout } from 'react-icons/sl'
import logo from '../../../public/logo.svg'
import { capitalize } from '@/utils/capitalize'
import { clearSession, getUser } from '@/hooks/useLocalStorage'
import {
  Flex,
  HStack,
  Text,
  VStack,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react'

export const Header = () => {
  const user = getUser()
  const router = useRouter()

  return (
    <HStack
      w="full"
      bg="primaryLight"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
      padding="1rem 8rem"
      justifyContent="space-between"
    >
      <Flex>
        <HStack>
          <Image src={logo} alt="Breat Cancer Detection Logo" width={40} />
          <VStack alignItems="center" gap={0}>
            <Text color="primary" fontSize="1.75rem" fontWeight={600}>
              OncoVision
            </Text>
            <Text color="primaryDark" fontSize="0.8rem" fontWeight={500}>
              Breast Cancer Detection
            </Text>
          </VStack>
        </HStack>
      </Flex>
      <HStack gap="2rem">
        <ChakraLink
          as={Link}
          href="#"
          color="dark"
          fontWeight={500}
          textDecor="none"
          ml="1.25rem"
          _hover={{ color: 'primary' }}
        >
          Olá, Dr(a). {capitalize(user)}
        </ChakraLink>

        <Button
          bgColor="primary"
          p={4}
          color="white"
          ml="1.25rem"
          _hover={{ bgColor: 'primaryDark' }}
          onClick={() => {
            clearSession()
            router.push('/')
          }}
        >
          <SlLogout />
          <Text ml={2}>Sair</Text>
        </Button>
      </HStack>
    </HStack>
  )
}
