import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const { height, width } = Dimensions.get("window");

const ImagePickerComponent = ({ onMediaCaptured }) => {
    const [media, setMedia] = useState("");
    const [mediaType, setMediaType] = useState(""); // Almacena el tipo de media (image/video)
    const [location, setLocation] = useState(null);
    const [confirm, setConfirm] = useState(false);

    const handlePickMedia = async (type) => {
        try {
            // Solicitar permisos de cámara
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permiso denegado", "El permiso para acceder a la cámara fue denegado.");
                return;
            }

            // Abrir la cámara
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: type, // Usar MediaTypeOptions para imágenes o videos
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled) {
                setMedia(result.assets[0].uri);
                setMediaType(result.assets[0].type); // Guardar el tipo de media
                const locationData = await handleGetLocation(); // Obtener ubicación
                setConfirm(true);

                // Notificar al componente padre si la función está definida
                if (onMediaCaptured) {
                    onMediaCaptured({
                        id: Date.now().toString(), // Generar un ID único
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
                {mediaType === "video" ? (
                    <Text style={styles.videoText}>Video capturado</Text>
                ) : (
                    <Image
                        style={styles.img}
                        source={media ? { uri: media } : { uri: "https://i.ibb.co/yXZXXJ1/user-login-icon-14.png" }}
                    />
                )}
                <View style={styles.containerBtn}>
                    <TouchableOpacity
                        style={styles.btnCamara}
                        onPress={() => handlePickMedia(ImagePicker.MediaTypeOptions.Images)}
                    >
                        <AntDesign name="camera" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnCamara}
                        onPress={() => handlePickMedia(ImagePicker.MediaTypeOptions.Videos)}
                    >
                        <AntDesign name="videocamera" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {confirm && (
                <TouchableOpacity style={styles.btnConfirm} onPress={() => Alert.alert("Media guardado")}>
                    <Text style={styles.text}>Guardar Media</Text>
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
    videoText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: height * 0.1,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    btnCamara: {
        backgroundColor: "#ffffff",
        borderRadius: height * 0.5,
        borderWidth: 1,
        padding: 9,
        marginHorizontal: 10,
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