import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  HStack,
  Text,
  Link,
  useToast,
} from "native-base"

export default function Login() {
  const navigation = useNavigation()
  const toast = useToast()

  const [user, setUser] = useState({ email: "", password: "" })

  const handleSubmit = async () => {
    // try {
    //   if (!user.email || !user.password) {
    //     throw new Error("Email e senha são obrigatórios")
    //   }

    //   // Aqui você pode chamar o UserService.login, por exemplo:
    //   // const response = await UserService.login(user.email, user.password)
    //   // saveToken(response.hash)
    //   // saveUser(user.email)

    //   toast.show({
    //     title: `Bem-vindo(a), ${user.email}`,
    //     placement: "top",
    //     bgColor: "green.500",
    //   })

    //   navigation.navigate("Dashboard") // ajuste para a rota real
    // } catch (error: any) {
    //   toast.show({
    //     title: error.message || "Erro inesperado",
    //     placement: "top",
    //     bgColor: "red.500",
    //   })
    // }
    navigation.navigate("Dashboard");
  }

  return (
    <Box
      flex={1}
      bg="#f9f9f9"
      px={6}
      py={10}
      justifyContent="center"
      alignItems="center"
    >
      <Box bg="white" p={6} borderRadius="lg" w="100%" maxW="400" shadow={3}>
        <VStack space={5}>
          <Heading fontSize="xl" color="#e84c88" textAlign="center">
            Acesse sua conta
          </Heading>

          <VStack space={3}>
            <Text fontSize="md" color="gray.700">
              Usuário
            </Text>
            <Input
              placeholder="Seu email"
              variant="outline"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />

            <Text fontSize="md" color="gray.700" mt={3}>
              Senha
            </Text>
            <Input
              placeholder="Sua senha"
              variant="outline"
              secureTextEntry
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
            />
          </VStack>

          <HStack justifyContent="flex-end">
            <Text fontSize="sm" color="#e84c88">
              Esqueceu sua senha?
            </Text>
          </HStack>

          <Button
            mt={3}
            bg="#e84c88"
            _pressed={{ bg: "#c23a6b" }}
            onPress={handleSubmit}
          >
            Entrar
          </Button>

          <HStack justifyContent="center" mt={2}>
            <Text>Não tem uma conta? </Text>
            <Link
              _text={{ color: "#e84c88", fontWeight: "bold" }}
              onPress={() => navigation.navigate("SignUp")}
            >
              Cadastre-se
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
