import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import ImagePicker from '../components/ImagePicker';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get("window");

const Home = ({ onMediaCaptured }) => {
  return (
    <LinearGradient 
      colors={['#1c1c1c', '#4b4b4b']} 
      style={styles.background}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🎥 Captura tus Momentos</Text>
        <Text style={styles.subtitle}>Toma fotos y graba videos para guardar tus recuerdos</Text>
        <View style={styles.card}>
          <ImagePicker onMediaCaptured={onMediaCaptured} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // Overlay semitransparente para mejorar la legibilidad
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFD700', // Dorado para destacar
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo casi opaco para resaltar la sección
    borderRadius: 25,
    paddingVertical: 35,
    paddingHorizontal: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12, // Elevación para Android
  },
});
