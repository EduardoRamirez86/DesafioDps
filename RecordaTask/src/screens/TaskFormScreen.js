import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../utils/colors';

export default function TaskFormScreen({ navigation, route }) {
  const editingTask = route.params?.task || null;

  const [name, setName] = useState(editingTask?.name || '');
  const [category, setCategory] = useState(editingTask?.category || '');
  const [team, setTeam] = useState(editingTask?.team || '');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (editingTask) {
      const dt = new Date(editingTask.dueDate);
      setDueDate(dt);
    }
  }, [editingTask]);

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'dismissed') return;
    }

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(dueDate.getHours(), dueDate.getMinutes());
      setDueDate(newDate);
      if (Platform.OS === 'ios') setShowDatePicker(false);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      if (event.type === 'dismissed') return;
    }

    if (selectedTime) {
      const newDate = new Date(dueDate);
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setDueDate(newDate);
      if (Platform.OS === 'ios') setShowTimePicker(false);
    }
  };

  const saveTask = async () => {
    if (!name.trim() || !category.trim()) {
      Alert.alert('Error', 'Complete los campos obligatorios');
      return;
    }

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      let tasks = storedTasks ? JSON.parse(storedTasks) : [];

      if (editingTask) {
        tasks = tasks.map(task =>
          task.id === editingTask.id
            ? { ...task, name, category, team, dueDate: dueDate.toISOString() }
            : task
        );
      } else {
        tasks.push({
          id: Date.now(),
          name,
          category,
          team,
          dueDate: dueDate.toISOString()
        });
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'No se pudo guardar la tarea');
    }
  };

  return (
    <LinearGradient
      colors={['#2E0F64', '#15002B']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Nombre de la Actividad *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ingrese el nombre de la actividad"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Materia / Categoría *</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Ingrese la categoría"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Equipo (opcional)</Text>
        <TextInput
          style={styles.input}
          value={team}
          onChangeText={setTeam}
          placeholder="Ingrese el equipo"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Fecha y Hora de Entrega *</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.pickerButton}
        >
          <Text style={styles.pickerButtonText}>Seleccionar Fecha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.pickerButton}
        >
          <Text style={styles.pickerButtonText}>Seleccionar Hora</Text>
        </TouchableOpacity>

        <Text style={styles.dateText}>
          {dueDate.toLocaleDateString()} {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={dueDate}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
            onChange={onChangeTime}
          />
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={editingTask ? "Actualizar Actividad" : "Guardar Actividad"}
            onPress={saveTask}
            color="#28A745" // Mejorado verde para mayor visibilidad
          />
        </View>
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
    padding: 20,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  pickerButton: {
    backgroundColor: '#444', // Revertido al color original
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  pickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
