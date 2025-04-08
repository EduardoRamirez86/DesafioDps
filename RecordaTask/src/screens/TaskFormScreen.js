// src/screens/TaskFormScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../utils/colors';

export default function TaskFormScreen({ navigation, route }) {
  // Si se recibe un task, significa que se está editando
  const editingTask = route.params && route.params.task;

  const [name, setName] = useState(editingTask ? editingTask.name : '');
  const [category, setCategory] = useState(editingTask ? editingTask.category : '');
  const [team, setTeam] = useState(editingTask ? editingTask.team : '');
  // Se guarda la fecha en formato Date; si se está editando, se parsea la fecha ISO almacenada
  const [dueDate, setDueDate] = useState(editingTask ? new Date(editingTask.dueDate) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [manualInput, setManualInput] = useState(false);
  const [manualDate, setManualDate] = useState('');
  const [manualTime, setManualTime] = useState('');

  useEffect(() => {
    // Si se está en modo edición y se quiere usar entrada manual, precargar los datos
    if (editingTask) {
      const dt = new Date(editingTask.dueDate);
      // Prepara strings en formato DD/MM/YYYY y HH:mm
      const day = ('0' + dt.getDate()).slice(-2);
      const month = ('0' + (dt.getMonth() + 1)).slice(-2);
      const year = dt.getFullYear();
      const hours = ('0' + dt.getHours()).slice(-2);
      const minutes = ('0' + dt.getMinutes()).slice(-2);
      setManualDate(`${day}/${month}/${year}`);
      setManualTime(`${hours}:${minutes}`);
    }
  }, [editingTask]);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const toggleManualInput = () => {
    setManualInput(!manualInput);
  };

  const parseManualDateTime = (dateStr, timeStr) => {
    const dateParts = dateStr.split('/');
    const timeParts = timeStr.split(':');
    if (dateParts.length !== 3 || timeParts.length !== 2) {
      return null;
    }
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    
    const parsedDate = new Date(year, month, day, hours, minutes);
    if (isNaN(parsedDate.getTime())) {
      return null;
    }
    return parsedDate;
  };

  const saveTask = async () => {
    if (name.trim() === '' || category.trim() === '') {
      Alert.alert('Error', 'Complete los campos obligatorios');
      return;
    }

    let finalDate = dueDate;
    if (manualInput) {
      const parsed = parseManualDateTime(manualDate, manualTime);
      if (!parsed) {
        Alert.alert('Error', 'La fecha u hora ingresadas no son válidas. Use el formato DD/MM/YYYY y HH:mm');
        return;
      }
      finalDate = parsed;
    }

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      let tasks = storedTasks ? JSON.parse(storedTasks) : [];

      if (editingTask) {
        // Actualiza la tarea existente
        tasks = tasks.map(task => {
          if (task.id === editingTask.id) {
            return {
              ...task,
              name,
              category,
              team,
              dueDate: finalDate.toISOString()
            };
          }
          return task;
        });
      } else {
        // Crear nueva tarea
        const newTask = {
          id: Date.now(),
          name,
          category,
          team,
          dueDate: finalDate.toISOString()
        };
        tasks.push(newTask);
      }
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack();
    } catch (error) {
      console.error('Error guardando tarea', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la Actividad *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Materia / Categoría *</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Equipo (opcional)</Text>
      <TextInput
        style={styles.input}
        value={team}
        onChangeText={setTeam}
      />

      <Text style={styles.label}>Fecha y Hora de Entrega *</Text>
      <TouchableOpacity onPress={toggleManualInput} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {manualInput ? 'Usar picker nativo' : 'Ingresar fecha/hora manualmente'}
        </Text>
      </TouchableOpacity>

      {manualInput ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={manualDate}
            onChangeText={setManualDate}
          />
          <TextInput
            style={styles.input}
            placeholder="HH:mm"
            value={manualTime}
            onChangeText={setManualTime}
          />
        </View>
      ) : (
        <View>
          <Button title="Seleccionar Fecha/Hora" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={dueDate}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Text style={styles.dateText}>{new Date(dueDate).toLocaleString()}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Guardar Actividad" onPress={saveTask} color={colors.PRIMARY_COLOR} />
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
    marginTop: 5
  },
  dateText: {
    marginTop: 10,
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 30
  },
  toggleButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center'
  },
  toggleButtonText: {
    color: '#333',
    fontWeight: 'bold'
  }
});
