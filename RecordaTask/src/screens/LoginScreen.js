// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fragmento del método handleLogin
const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Debe ingresar correo y contraseña');
      return;
    }
  
    try {
      const storedUser = await AsyncStorage.getItem('registeredUser');
      const userData = storedUser ? JSON.parse(storedUser) : null;
  
      if (userData && userData.email === email && userData.password === password) {
        await AsyncStorage.setItem('userToken', 'dummy-token');
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en inicio de sesión', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Ingresar" onPress={handleLogin} color="#1181BF" />
      <View style={styles.registerContainer}>
        <Text>¿No tienes una cuenta?</Text>
        <Button
          title="Regístrate"
          onPress={() => navigation.navigate('Register')}
          color="#1181BF"
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
