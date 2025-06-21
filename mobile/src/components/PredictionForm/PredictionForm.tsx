import React, { useState } from "react"
import {
  VStack,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  Text,
} from "native-base"

export default function PredictionForm() {
  const [areaMedia, setAreaMedia] = useState("")
  const [raioMedio, setRaioMedio] = useState("")
  const [texturaMedia, setTexturaMedia] = useState("")
  const [perimetroMedio, setPerimetroMedio] = useState("")
  const [suavidadeMedia, setSuavidadeMedia] = useState("")

  const handleSubmit = () => {
    // Aqui você pode tratar o envio dos dados futuramente
    console.log({
      areaMedia,
      raioMedio,
      texturaMedia,
      perimetroMedio,
      suavidadeMedia,
    })
    alert("Análise enviada com sucesso!")
  }

  return (
    <Box
      bg="white"
      borderRadius="md"
      shadow={2}
      w="100%"
      p={4}
    >
      <Box
        bg="#eee"
        p={3}
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
      >
        <Heading size="md" color="gray.800">
          Inserir dados do exame
        </Heading>
      </Box>

      <VStack space={4} mt={4}>
        <Heading size="sm" color="gray.700">
          Características Médias
        </Heading>

        <FormControl isRequired>
          <FormControl.Label>Área Média</FormControl.Label>
          <Input
            placeholder="Área Média"
            keyboardType="numeric"
            value={areaMedia}
            onChangeText={setAreaMedia}
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>Raio Médio</FormControl.Label>
          <Input
            placeholder="Raio Médio"
            keyboardType="numeric"
            value={raioMedio}
            onChangeText={setRaioMedio}
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>Textura Média</FormControl.Label>
          <Input
            placeholder="Textura Média"
            keyboardType="numeric"
            value={texturaMedia}
            onChangeText={setTexturaMedia}
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>Perímetro Médio</FormControl.Label>
          <Input
            placeholder="Perímetro Médio"
            keyboardType="numeric"
            value={perimetroMedio}
            onChangeText={setPerimetroMedio}
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>Suavidade Média</FormControl.Label>
          <Input
            placeholder="Suavidade Média"
            keyboardType="numeric"
            value={suavidadeMedia}
            onChangeText={setSuavidadeMedia}
          />
        </FormControl>

        <Button
          mt={4}
          bg="#e84c88"
          _pressed={{ bg: "#c23a6b" }}
          onPress={handleSubmit}
        >
          <Text color="white">Analisar</Text>
        </Button>
      </VStack>
    </Box>
  )
}
