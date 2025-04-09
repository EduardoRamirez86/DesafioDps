import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Modal, Alert } from 'react-native';

const Gallery = ({ capturedMedia, setCapturedMedia }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleMediaPress = (media) => {
        setSelectedMedia(media);
        setIsModalVisible(true);
    };

    const handleDeleteMedia = (id) => {
        Alert.alert(
            "Eliminar archivo",
            "¿Estás seguro de que deseas eliminar este archivo?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", style: "destructive", onPress: () => deleteMedia(id) },
            ]
        );
    };

    const deleteMedia = (id) => {
        const updatedMedia = capturedMedia.filter((item) => item.id !== id);
        setCapturedMedia(updatedMedia);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => handleMediaPress(item)}>
                <Image source={{ uri: item.uri }} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.location}>
                {item.location
                    ? `Lat: ${item.location.latitude}, Lng: ${item.location.longitude}`
                    : "Sin ubicación"}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteMedia(item.id)}>
                <Text style={styles.deleteText}>🗑 Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Archivos</Text>
            <FlatList
                data={capturedMedia}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            {selectedMedia && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: selectedMedia.uri }} style={styles.modalImage} />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default Gallery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    location: {
        flex: 1,
        fontSize: 14,
        color: '#555',
    },
    deleteText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
