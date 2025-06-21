import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigationState } from "@react-navigation/native"
import { NativeBaseProvider, Box } from "native-base"
//import Header from '../Header'; // ajuste o caminho conforme necessário

const hideHeaderRoutes = ["Login", "SignUp"]
const hideBackgroundRoutes = ["Dash", "NewPrediction"]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const state = useNavigationState((state) => state)
  const currentRoute = state.routes[state.index].name

  const showHeader = !hideHeaderRoutes.includes(currentRoute)
  const showBackground = !hideBackgroundRoutes.includes(currentRoute)

  return (
    <NativeBaseProvider>
      {showBackground ? (
        <LinearGradient
          colors={[
            "rgba(232, 76, 136, 0.15)",
            "rgba(232, 76, 136, 0)",
            "rgba(255, 255, 255, 0.9)",
          ]}
          locations={[0, 0.9, 1]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.3 }}
        >
          <Box flex={1} px={4} justifyContent="center" alignItems="center">
            {children}
          </Box>
        </LinearGradient>
      ) : (
        <Box flex={1} px={4}>
          {children}
        </Box>
      )}
    </NativeBaseProvider>
  )
}
