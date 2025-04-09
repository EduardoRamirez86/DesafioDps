import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const Gallery = ({ capturedMedia }) => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.uri }}
                style={styles.icon}
            />
            <Text style={styles.location}>
                {item.location
                    ? `Lat: ${item.location.latitude}, Lng: ${item.location.longitude}`
                    : "Sin ubicación"}
            </Text>
            <Text style={styles.type}>
                {item.type === 'image' ? 'Imagen' : 'Video'}
            </Text>
            <View style={styles.actions}>
                <TouchableOpacity>
                    <Text style={styles.actionText}>🗑</Text>
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
                keyExtractor={(item, index) => index.toString()}
            />
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
    type: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    actions: {
        flexDirection: 'row',
    },
    actionText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
});
