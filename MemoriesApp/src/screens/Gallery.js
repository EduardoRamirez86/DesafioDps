import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Video } from 'expo-av';

const Gallery = ({ capturedMedia, setCapturedMedia }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedAnnotation, setEditedAnnotation] = useState("");

    const handleEditAnnotation = (media) => {
        setSelectedMedia(media);
        setEditedAnnotation(media.annotation || "");
        setIsModalVisible(true);
    };

    const handleSaveAnnotation = () => {
        setCapturedMedia((prev) =>
            prev.map((item) =>
                item.id === selectedMedia.id ? { ...item, annotation: editedAnnotation } : item
            )
        );
        setIsModalVisible(false);
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
            <TouchableOpacity onPress={() => handleEditAnnotation(item)}>
                {item.type === "video" ? (
                    <Video
                        source={{ uri: item.uri }}
                        style={styles.media}
                        useNativeControls
                        resizeMode="cover"
                        isLooping
                    />
                ) : (
                    <Image source={{ uri: item.uri }} style={styles.media} />
                )}
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.annotation}>{item.annotation || "Sin anotación"}</Text>
                <Text style={styles.location}>
                    {item.location
                        ? `Lat: ${item.location.latitude}, Lng: ${item.location.longitude}`
                        : "Sin ubicación"}
                </Text>
                <TouchableOpacity onPress={() => handleDeleteMedia(item.id)}>
                    <Text style={styles.deleteText}>🗑 Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Archivos</Text>
            <FlatList
                data={capturedMedia}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {selectedMedia && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {selectedMedia.type === "video" ? (
                                <Text style={styles.modalText}>Video seleccionado</Text>
                            ) : (
                                <Image style={styles.img} source={{ uri: selectedMedia.uri }} />
                            )}
                            <TextInput
                                style={styles.annotationInput}
                                placeholder="Edita la anotación..."
                                value={editedAnnotation}
                                onChangeText={setEditedAnnotation}
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAnnotation}>
                                <Text style={styles.saveButtonText}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
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
        color: '#4A4A4A',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    media: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    infoContainer: {
        marginTop: 10,
    },
    annotation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    location: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    deleteText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    img: {
        height: 200,
        width: 200,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    annotationInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
