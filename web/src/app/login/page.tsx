'use client'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toaster } from '@/components/ui/toaster'
import { saveToken, saveUser } from '@/hooks/useLocalStorage'
import { UserService } from '@/service/auth-services'
import { capitalize } from '@/utils/capitalize'
import {
  Box,
  Heading,
  VStack,
  Field,
  Input,
  Button,
  HStack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState({ email: '', password: '' })

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        if (!user.email || !user.password) {
          throw new Error('Email and password are required')
        }

        const { email, password } = user

        const response = await UserService.login(email, password)
        saveToken(response.hash)
        saveUser(user.email)

        toaster.create({
          title: 'Sucesso',
          description: `Bem-vinda ${capitalize(user.email)}!`,
          type: 'success',
        })

        router.push('/dash')
      } catch (e: unknown) {
        toaster.create({
          title: 'Erro',
          description: `${
            e instanceof Error ? e.message : 'An unknown error occurred'
          }`,
          type: 'error',
        })
      }
    },
    [router, user]
  )

  return (
    <Box
      as="form"
      w="31.25rem"
      h="27.375rem"
      p="1.875rem"
      bgColor="light"
      borderRadius="1rem"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      onSubmit={handleSubmit}
    >
      <VStack gap="1.5rem">
        <Heading as="h2" color="primary" fontSize="1.5rem" fontWeight={700}>
          Acesse sua conta
        </Heading>

        <Box w="full">
          <Field.Root required>
            <Field.Label color="dark" fontSize="1rem">
              Usuário <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Seu usuário"
              type="text"
              borderColor="input"
              color="secondary"
              pl="0.5rem"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Field.HelperText></Field.HelperText>
          </Field.Root>
        </Box>

        <Box w="full">
          <Field.Root required>
            <Field.Label color="dark" fontSize="1rem">
              Senha <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Seu senha"
              type="password"
              borderColor="input"
              color="secondary"
              pl="0.5rem"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Field.HelperText></Field.HelperText>
          </Field.Root>
        </Box>

        <HStack
          w="full"
          color="primary"
          justifyContent="flex-end"
          fontSize="0.875rem"
        >
          Esqueceu sua senha?
        </HStack>

        <Button
          w="full"
          bgColor="primary"
          color="light"
          type="submit"
          _hover={{ bgColor: 'primaryDark' }}
        >
          Entrar
        </Button>

        <Box>
          <Text color="dark">
            Não tem uma conta?{' '}
            <ChakraLink
              as={Link}
              href="/sign-up"
              color="primary"
              fontWeight={600}
              textDecor="none"
            >
              Cadastre-se
            </ChakraLink>
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
