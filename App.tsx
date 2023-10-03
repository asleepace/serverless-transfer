/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useSocket} from './src/hooks/useSocket'

//const socket = startListening()
//console.log(socket)

function App(): JSX.Element {
  const {data} = useSocket('192.168.11.226', 6969)
  console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darker,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App
