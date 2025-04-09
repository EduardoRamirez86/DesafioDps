// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos nuestros screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen'; // 👈 IMPORTANTE
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Screen de inicio de sesión */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }} 
        />

        {/* Screen de registro */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'Crear Cuenta' }} 
        />

        {/* Screen principal con la lista de actividades */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'RecordaTask' }} 
        />

        {/* Screen para crear (o editar) tareas */}
        <Stack.Screen 
          name="TaskForm" 
          component={TaskFormScreen}
          options={({ route }) => ({
            title: route.params && route.params.task ? 'Editar Actividad' : 'Nueva Actividad'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

