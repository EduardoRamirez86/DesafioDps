import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import ImagePicker from '../components/ImagePicker';
import Location from '../components/Location';

const Home = ({ onMediaCaptured }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Multimedia</Text>
            <ImagePicker onMediaCaptured={onMediaCaptured} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});