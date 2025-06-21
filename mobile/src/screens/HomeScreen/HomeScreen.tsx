import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AppLayout from "../../components/AppLayout/AppLayout"
import { Shadow } from "react-native-shadow-2"
import { Text, VStack, HStack, Button, Box, Center } from "native-base"

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <AppLayout>
      {/* <Center flex={1} bg="#f9f9f9" px={4}> */}
      <VStack space={6} alignItems="center">
        <Shadow distance={30} startColor="rgba(0,0,0,0.08)">
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logo}
            />
          </View>
        </Shadow>

        <Text fontSize="4xl" fontWeight="bold" color="#e84c88">
          OncoVision
        </Text>
        <Text fontSize="lg" mt={-8} color="#c23a6b">
          Breast Cancer Detection
        </Text>

        <HStack space={7} mt={8}>
          <Button
            w="40"
            borderRadius="xl"
            bg="#c23a6b"
            _pressed={{ bg: "#e84c88" }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Criar Conta
          </Button>
          <Button
            w="40"
            borderRadius="xl"
            bg="#c23a6b"
            _pressed={{ bg: "#e84c88" }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Entrar
          </Button>
        </HStack>

        <Box mt={10} px={4}>
          <Text
            fontSize="lg"
            fontWeight="medium"
            textAlign="center"
            color="#4a5568"
          >
            Bem-vindo ao OncoVision!
          </Text>
          <Text mt={3} textAlign="center" color="#4a5568">
            Oferecemos uma plataforma inovadora que utiliza inteligência
            artificial para auxiliar na identificação precoce do câncer de mama,
            promovendo diagnósticos mais rápidos, eficazes e confiáveis.
          </Text>
        </Box>
      </VStack>
      {/* </Center> */}
    </AppLayout>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 200,
    height: 200,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
  },
  logo: {
    width: 200,
    height: 180,
    resizeMode: "contain",
  },
})
