import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import React from 'react';
import ImagePicker from '../components/ImagePicker';

const Home = ({ onMediaCaptured }) => {
    return (
        <ImageBackground
            source={{ uri: 'https://i.ibb.co/7bQQYkX/background.jpg' }} // Fondo atractivo
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>📸 Captura tus Momentos</Text>
                <View style={styles.card}>
                    <ImagePicker onMediaCaptured={onMediaCaptured} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Home;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Oscurece el fondo para resaltar el contenido
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFD700', // Color dorado para destacar
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco translúcido
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        width: '95%', // Aumenta el ancho del contenedor
        height: '70%', // Aumenta la altura del contenedor
        alignItems: 'center',
        justifyContent: 'center', // Centra el contenido dentro del contenedor
    },
});