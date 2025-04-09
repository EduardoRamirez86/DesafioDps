// Este archivo contiene la pantalla para crear o editar tareas.
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../utils/colors';

export default function TaskFormScreen({ navigation, route }) {
  // Verifica si se está editando una tarea existente o creando una nueva.
  const editingTask = route.params?.task || null;

  // Estados para almacenar los detalles de la tarea.
  const [name, setName] = useState(editingTask?.name || ''); // Nombre de la tarea.
  const [category, setCategory] = useState(editingTask?.category || ''); // Categoría o materia de la tarea.
  const [team, setTeam] = useState(editingTask?.team || ''); // Equipo asociado (opcional).
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate) : new Date()); // Fecha y hora de entrega.
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla la visibilidad del selector de fecha.
  const [showTimePicker, setShowTimePicker] = useState(false); // Controla la visibilidad del selector de hora.

  // Precarga los campos de fecha y hora si se está editando una tarea.
  useEffect(() => {
    if (editingTask) {
      const dt = new Date(editingTask.dueDate);
      setDueDate(dt);
    }
  }, [editingTask]);

  // Maneja los cambios en el selector de fecha.
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // Oculta el picker en Android después de seleccionar.
      if (event.type === 'dismissed') return; // Salir si se cancela.
    }

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(dueDate.getHours(), dueDate.getMinutes()); // Preserva la hora existente.
      setDueDate(newDate);
      if (Platform.OS === 'ios') setShowDatePicker(false); // Oculta el picker en iOS.
    }
  };

  // Maneja los cambios en el selector de hora.
  const onChangeTime = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false); // Oculta el picker en Android después de seleccionar.
      if (event.type === 'dismissed') return; // Salir si se cancela.
    }

    if (selectedTime) {
      const newDate = new Date(dueDate);
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes()); // Actualiza la hora preservando la fecha.
      setDueDate(newDate);
      if (Platform.OS === 'ios') setShowTimePicker(false); // Oculta el picker en iOS.
    }
  };

  // Guarda la tarea en AsyncStorage.
  const saveTask = async () => {
    if (!name.trim() || !category.trim()) {
      Alert.alert('Error', 'Complete los campos obligatorios');
      return;
    }

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      let tasks = storedTasks ? JSON.parse(storedTasks) : [];

      if (editingTask) {
        // Actualiza una tarea existente.
        tasks = tasks.map(task =>
          task.id === editingTask.id
            ? { ...task, name, category, team, dueDate: dueDate.toISOString() }
            : task
        );
      } else {
        // Agrega una nueva tarea.
        tasks.push({
          id: Date.now(),
          name,
          category,
          team,
          dueDate: dueDate.toISOString()
        });
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack(); // Regresa a la pantalla anterior.
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'No se pudo guardar la tarea');
    }
  };

  return (
    <View style={styles.container}>
      {/* Campos de entrada para los detalles de la tarea */}
      <Text style={styles.label}>Nombre de la Actividad *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre de la actividad"
      />

      <Text style={styles.label}>Materia / Categoría *</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Ingrese la categoría"
      />

      <Text style={styles.label}>Equipo (opcional)</Text>
      <TextInput
        style={styles.input}
        value={team}
        onChangeText={setTeam}
        placeholder="Ingrese el equipo"
      />

      {/* Botones para abrir los pickers */}
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

      {/* Pickers de fecha y hora */}
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

      {/* Botón para guardar */}
      <View style={styles.buttonContainer}>
        <Button
          title={editingTask ? "Actualizar Actividad" : "Guardar Actividad"}
          onPress={saveTask}
          color={colors.PRIMARY_COLOR}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 30
  },
  pickerButton: {
    backgroundColor: colors.BUTTON_COLOR || '#eee',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  pickerButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});