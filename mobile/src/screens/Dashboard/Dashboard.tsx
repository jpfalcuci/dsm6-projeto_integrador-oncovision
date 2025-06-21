import React, { useState } from "react"
import {
  Box,
  Heading,
  Spinner,
  Text,
  Button,
  HStack,
  FlatList,
  VStack,
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import Header from "../../components/Header/Header" // ajuste o caminho se necessário

export default function Dashboard() {
  const navigation = useNavigation()

  const [history, setHistory] = useState([
    // Dados mockados para teste enquanto não há backend
    {
      id: 1,
      date: "2024-06-13",
      result: "Negativo",
    },
    {
      id: 2,
      date: "2024-06-12",
      result: "Positivo",
    },
    {
      id: 3,
      date: "2024-05-15",
      result: "Positivo",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const renderItem = ({ item }: any) => (
    <Box px={4} py={3} bg="white" borderRadius="md" shadow={1} mb={3}>
      <VStack space={1}>
        <Text fontWeight="bold" color="gray.800">
          Data: {item.date}
        </Text>
        <Text color="gray.600">Resultado: {item.result}</Text>
        <Text color="gray.500" fontSize="xs">
          ID: {item.id}
        </Text>
      </VStack>
    </Box>
  )

  return (
    <Box flex={1} bg="#f9f9f9">
      <Header /> {/* ✅ Adicionando o Header */}

      <Box px={5} py={6} flex={1}>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="md" color="#333">
            Histórico de Predições
          </Heading>
          <Button
            bg="#e84c88"
            _pressed={{ bg: "#c23a6b" }}
            onPress={() => navigation.navigate("NewPrediction")}
          >
            Nova Predição
          </Button>
        </HStack>

        {isLoading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Spinner size="lg" color="#e84c88" />
          </Box>
        ) : history.length > 0 ? (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text textAlign="center" color="gray.600" mt={20}>
            Não há histórico de predições.
          </Text>
        )}
      </Box>
    </Box>
  )
}
