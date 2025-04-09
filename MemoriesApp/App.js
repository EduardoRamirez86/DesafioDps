import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import Home from './src/screens/Home'

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Home />
        </SafeAreaView>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "azure"
    }
})