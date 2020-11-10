import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'; //Use Fonts somente de uma

import Routes from './src/routes';

// JSX: XML Dentro do Javascript
export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Ubuntu_700Bold, Roboto_500Medium
  });
  
  if(!fontsLoaded) {
    return <AppLoading />
  }

  //Fragment <> </>
  return (
    <> 
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Routes />
    </>
  );
}

//sempre display flex 

