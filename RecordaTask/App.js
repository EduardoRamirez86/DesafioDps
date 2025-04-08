// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos nuestros screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
// (Si se agrega edición, podría importarse EditTaskScreen)

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
          options={{ title: 'Nueva Actividad' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
