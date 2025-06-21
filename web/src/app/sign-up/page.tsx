'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { UserService } from '@/service/auth-services'
import { toaster } from '@/components/ui/toaster'
import { capitalize } from '@/utils/capitalize'

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      try {
        if (!newUser.username || !newUser.password) {
          throw new Error('Email and password are required')
        }

        if (!newUser.password !== !newUser.confirmPassword) {
          throw new Error(
            'Os campos de senha e confirmar senha devem ser iguais'
          )
        }

        const { username, password } = newUser

        await UserService.register(username, password)

        toaster.create({
          title: 'Sucesso',
          description: `Usuário ${capitalize(username)} cadastrado!`,
          type: 'success',
        })

        router.push('/login')
      } catch (e: unknown) {
        toaster.create({
          title: 'Erro',
          description: `${
            e instanceof Error
              ? e.message
              : 'Ocorreu um erro no servidor. Tente novamente!'
          }`,
          type: 'error',
        })
      }
    },
    [newUser, router]
  )

  return (
    <Box
      as="form"
      w="31.25rem"
      h="auto"
      p="1.875rem"
      bgColor="light"
      borderRadius="1rem"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      onSubmit={handleSubmit}
    >
      <VStack gap="1rem">
        <Heading as="h2" color="primary" fontSize="1.5rem" fontWeight={700}>
          Crie uma nova conta
        </Heading>

        <Box w="full">
          <Field.Root required>
            <Field.Label color="dark" fontSize="1rem">
              Nome <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Insira um nome de usuário"
              type="text"
              borderColor="input"
              color="secondary"
              pl="0.5rem"
              value={newUser.username}
              onChange={(e) => {
                setNewUser({ ...newUser, username: e.target.value })
              }}
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
              value={newUser.password}
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value })
              }}
            />
            <Field.HelperText></Field.HelperText>
          </Field.Root>
        </Box>

        <Box w="full">
          <Field.Root required>
            <Field.Label color="dark" fontSize="1rem">
              Confirme sua senha <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Confirme sua senha"
              type="password"
              borderColor="input"
              color="secondary"
              pl="0.5rem"
              value={newUser.confirmPassword}
              onChange={(e) => {
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }}
            />
            <Field.HelperText></Field.HelperText>
          </Field.Root>
        </Box>

        <Button
          w="full"
          bgColor="primary"
          color="light"
          type="submit"
          _hover={{ bgColor: 'primaryDark' }}
        >
          Cadastrar
        </Button>

        <Box>
          <Text color="dark">
            Já tem uma conta?{' '}
            <ChakraLink
              as={Link}
              href="/login"
              color="primary"
              fontWeight={600}
              textDecor="none"
            >
              Entrar
            </ChakraLink>
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
