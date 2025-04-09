import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePickerExpo from 'expo-image-picker';

const { height, width } = Dimensions.get("window")

const ImagePicker = () => {

    const [image, setImage] = useState("")
    const [confirm, setConfirm] = useState(false)

    const handlePickImage = async () => {
        const { status } = await ImagePickerExpo.requestCameraPermissionsAsync()

        if (status !== "granted") {
            Alert.alert("El permiso para acceder a la camara fue denegado")
            return
        }

        let result = await ImagePickerExpo.launchCameraAsync({
            mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setConfirm(true)
        }
    }

    const handleSubmitImage = () => {
        // Guardar en base de datos
        Alert.alert("Image Subida")
        setConfirm(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image style={styles.img} source={image ? { uri: image } : { uri: "https://i.ibb.co/yXZXXJ1/user-login-icon-14.png" }} />
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={styles.btnCamara} onPress={handlePickImage}>
                        <AntDesign name="camera" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {confirm && <TouchableOpacity style={styles.btnConfirm} onPress={handleSubmitImage}>
                <Text style={styles.text}>Guardar Foto</Text>
            </TouchableOpacity>

            }
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
        padding: 20,
    },
    containerImg: {
        borderWidth: 1,
        borderRadius: height * 0.5,
        backgroundColor: "#ffffff"
    },
    img: {
        height: height * 0.3,
        width: height * 0.3,
        borderRadius: height * 0.5,
        resizeMode: 'center'
    },
    containerBtn: {
        position: 'absolute',
        bottom: width * 0.01,
        right: width * 0.01
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
        borderRadius: 3
    },
    text: {
        fontWeight: 'bold',
        color: "#ffffff",
        fontSize: 16
    },
})