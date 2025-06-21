import React from "react"
import { Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  HStack,
  VStack,
  Text,
  Button,
  Pressable,
  Box,
} from "native-base"
// import { SlLogout } from "react-icons/sl" // Se estiver no React Native Web, senão use outro
// Para React Native puro, pode usar @expo/vector-icons
import { AntDesign } from '@expo/vector-icons'

// import { capitalize } from "../../utils/capitalize"
// import { getUser } from "../../hooks/useLocalStorage"

export default function Header() {
  const navigation = useNavigation()
  // const user = getUser() || "Usuário"

  return (
    <Box
      w="100%"
      bg="#fde8ef"
      px={8}
      py={4}
      shadow={2}
    >
      <HStack justifyContent="space-between" alignItems="center">
        {/* Logo e texto */}
        <HStack alignItems="center" space={3}>
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 20, height: 40, resizeMode: "contain" }}
          />
          <VStack>
            <Text color="#e84c88" fontSize="xl" fontWeight="bold">
              OncoVision
            </Text>
            <Text color="#c23a6b" fontSize="xs">
              Breast Cancer Detection
            </Text>
          </VStack>
        </HStack>

        {/* Saudação e botão */}
        <HStack space={4} alignItems="center">
          <Text color="#333" fontSize="md">
            Olá, Dr(a).
          </Text>

          <Button
            bg="#e84c88"
            _pressed={{ bg: "#c23a6b" }}
            px={4}
            onPress={() => navigation.navigate("Home")}
            leftIcon={<AntDesign name="logout" size={16} color="white" />}
          >
            <Text color="white">Sair</Text>
          </Button>
        </HStack>
      </HStack>
    </Box>
  )
}
