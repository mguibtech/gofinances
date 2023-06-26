
import React, { useState, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { Dashboard } from './src/screens/Dashboard';
import theme from './src/global/styles/theme';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/Components/CategorySelect';

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({

  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1
      }}
      onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        {/* <Dashboard /> */}
        {/* <Register/> */}
        <CategorySelect/>
      </ThemeProvider>
    </View>


  );
}

