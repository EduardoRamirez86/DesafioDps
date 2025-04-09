import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import ImagePicker from '../components/ImagePicker';
import Location from '../components/Location';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Multimedia</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Fotografía</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Video</Text>
                </TouchableOpacity>
            </View>
            <ImagePicker />
            <Location />
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
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#d4e157',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});