import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../screens/HomeScreen/HomeScreen"
import SignUp from "../screens/SignUp/SignUp"
import SignIn from "../screens/SignIn/SignIn"
import Dashboard from "../screens/Dashboard/Dashboard"
import NewPrediction from "../screens/NewPrediction/NewPrediction"

const Stack = createNativeStackNavigator()

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Criar Conta" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "Entrar" }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          name="NewPrediction"
          component={NewPrediction}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
