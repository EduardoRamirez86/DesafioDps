import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error al cargar tareas', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });
    return unsubscribe;
  }, [navigation]);

  const deleteTask = async (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Está seguro de que desea eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const newTasks = tasks.filter(task => task.id !== id);
            setTasks(newTasks);
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
          },
        },
      ]
    );
  };

  const editTask = (task) => {
    navigation.navigate('TaskForm', { task });
  };

  return (
    <LinearGradient
      colors={['#2E0F64', '#15002B']}
      style={styles.background}
    >
      <View style={styles.container}>
        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>No hay actividades, agrega una.</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskItem 
                task={item} 
                onDelete={deleteTask}
                onEdit={editTask}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('TaskForm')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  fabText: {
    fontSize: 32,
    color: '#000000',
  },
});
