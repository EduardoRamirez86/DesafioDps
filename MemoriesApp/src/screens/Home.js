import { StyleSheet, Text, View, ImageBackground, Dimensions, Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';
import ImagePicker from '../components/ImagePicker';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get("window");

const Home = ({ onMediaCaptured }) => {
  // Animación para el overlay
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient 
      colors={['#0f2027', '#203a43', '#2c5364']} 
      style={styles.background}
      start={[0, 0]}
      end={[1, 1]}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Text style={styles.title}>🎥 Captura tus Momentos</Text>
        <Text style={styles.subtitle}>Toma fotos y graba videos para guardar tus recuerdos</Text>
        <View style={styles.card}>
          <ImagePicker onMediaCaptured={onMediaCaptured} />
        </View>
      </Animated.View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly lower opacity to let gradient shine through
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: width * 0.09, // Responsive text
    fontWeight: '900',
    color: '#FFD700', // Gold color
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 7,
  },
  subtitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 35,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 35,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
});
