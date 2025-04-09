import { StyleSheet, View } from 'react-native'
import React from 'react'
import ImagePicker from '../components/ImagePicker'
import Location from '../components/Location'

const Home = () => {
    return (
        <View style={styles.container}>
            <ImagePicker />
            <Location />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})