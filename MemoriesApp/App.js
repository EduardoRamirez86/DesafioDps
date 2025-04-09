import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import Home from './src/screens/Home';
import Gallery from './src/screens/Gallery';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
    const [capturedMedia, setCapturedMedia] = useState([]);

    const handleMediaCaptured = (media) => {
        setCapturedMedia((prev) => [...prev, media]);
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Multimedia') {
                            iconName = 'camera';
                        } else if (route.name === 'Lista de Archivos') {
                            iconName = 'folder';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'purple',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Multimedia">
                    {() => <Home onMediaCaptured={handleMediaCaptured} />}
                </Tab.Screen>
                <Tab.Screen name="Lista de Archivos">
                    {() => <Gallery capturedMedia={capturedMedia} setCapturedMedia={setCapturedMedia} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;