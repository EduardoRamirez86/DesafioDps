import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './src/screens/Home';
import Gallery from './src/screens/Gallery';
import MapScreen from './src/screens/MapScreen';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
    const [capturedMedia, setCapturedMedia] = useState([]);

    useEffect(() => {
        const loadMedia = async () => {
            const storedMedia = await AsyncStorage.getItem('capturedMedia');
            if (storedMedia) {
                setCapturedMedia(JSON.parse(storedMedia));
            }
        };
        loadMedia();
    }, []);

    const handleMediaCaptured = async (media) => {
        const updatedMedia = [...capturedMedia, media];
        setCapturedMedia(updatedMedia);
        await AsyncStorage.setItem('capturedMedia', JSON.stringify(updatedMedia));
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
                        } else if (route.name === 'Mapa') {
                            iconName = 'map';
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
                <Tab.Screen name="Mapa">
                    {() => <MapScreen capturedMedia={capturedMedia} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;