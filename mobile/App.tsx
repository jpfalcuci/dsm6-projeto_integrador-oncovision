import React from 'react';
import { NativeBaseProvider } from 'native-base';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <NativeBaseProvider>
      <StackNavigator />
    </NativeBaseProvider>
  );
}
