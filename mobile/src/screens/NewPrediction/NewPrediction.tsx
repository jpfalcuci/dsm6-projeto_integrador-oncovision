import React from "react"
import { useNavigation } from "@react-navigation/native"
import { VStack, Heading, Button, Text, Icon, HStack } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import PredictionForm from "../../components/PredictionForm/PredictionForm"

export default function NewPredictionScreen() {
  const navigation = useNavigation()

  return (
    <VStack px={8} py={6} space={6} flex={1} bg="#f9f9f9">
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <Heading fontSize="xl" color="gray.800" fontWeight="bold">
          Nova Predição
        </Heading>

        <Button
          bg="#c23a6b"
          _pressed={{ bg: "#e84c88" }}
          onPress={() => navigation.navigate("Dashboard")}
          leftIcon={
            <Icon as={Ionicons} name="arrow-back-circle-outline" size="md" color="white" />
          }
        >
          <Text color="white" ml={2}>
            Voltar para Histórico
          </Text>
        </Button>
      </HStack>

      {/* Componente do formulário de predição */}
      <PredictionForm />
    </VStack>
  )
}
