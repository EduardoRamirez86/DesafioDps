import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const { height, width } = Dimensions.get("window");

const ImagePickerComponent = ({ onMediaCaptured }) => {
    const [image, setImage] = useState("");
    const [location, setLocation] = useState(null);
    const [confirm, setConfirm] = useState(false);

    const handlePickImage = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permiso denegado", "El permiso para acceder a la cámara fue denegado.");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Usar MediaTypeOptions para imágenes
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                const locationData = await handleGetLocation();
                setConfirm(true);

                if (onMediaCaptured) {
                    onMediaCaptured({
                        id: Date.now().toString(),
                        uri: result.assets[0].uri,
                        type: result.assets[0].type,
                        location: locationData,
                    });
                }
            }
        } catch (error) {
            Alert.alert("Error", `Ocurrió un error al intentar abrir la cámara: ${error.message}`);
        }
    };

    const handleGetLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permiso denegado", "El permiso para acceder a la ubicación fue denegado.");
                return null;
            }

            const location = await Location.getCurrentPositionAsync({});
            const locationData = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setLocation(locationData);
            return locationData;
        } catch (error) {
            Alert.alert("Error", `Ocurrió un error al intentar obtener la ubicación: ${error.message}`);
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image
                    style={styles.img}
                    source={image ? { uri: image } : { uri: "https://i.ibb.co/yXZXXJ1/user-login-icon-14.png" }}
                />
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={styles.btnCamara} onPress={handlePickImage}>
                        <AntDesign name="camera" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {confirm && (
                <TouchableOpacity style={styles.btnConfirm} onPress={() => Alert.alert("Imagen guardada")}>
                    <Text style={styles.text}>Guardar Foto</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
        padding: 20,
    },
    containerImg: {
        borderWidth: 1,
        borderRadius: height * 0.5,
        backgroundColor: "#ffffff",
    },
    img: {
        height: height * 0.3,
        width: height * 0.3,
        borderRadius: height * 0.5,
        resizeMode: 'center',
    },
    containerBtn: {
        position: 'absolute',
        bottom: width * 0.01,
        right: width * 0.01,
    },
    btnCamara: {
        backgroundColor: "#ffffff",
        borderRadius: height * 0.5,
        borderWidth: 1,
        padding: 9,
    },
    btnConfirm: {
        backgroundColor: "#0000ff",
        width: width * 0.8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 3,
    },
    text: {
        fontWeight: 'bold',
        color: "#ffffff",
        fontSize: 16,
    },
});