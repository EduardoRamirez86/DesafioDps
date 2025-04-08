// src/screens/TaskFormScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../utils/colors';

export default function TaskFormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [team, setTeam] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Estados para la entrada manual
  const [manualInput, setManualInput] = useState(false);
  const [manualDate, setManualDate] = useState('');  // Ejemplo: "24/01/2025"
  const [manualTime, setManualTime] = useState('');  // Ejemplo: "14:30"

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  // Función para alternar entre picker y entrada manual
  const toggleManualInput = () => {
    setManualInput(!manualInput);
  };

  // Función para convertir entradas manuales a objeto Date
  const parseManualDateTime = (dateStr, timeStr) => {
    // Se espera formato "DD/MM/YYYY" y "HH:mm"
    const dateParts = dateStr.split('/');
    const timeParts = timeStr.split(':');
    if (dateParts.length !== 3 || timeParts.length !== 2) {
      return null;
    }
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // El mes es 0-indexado
    const year = parseInt(dateParts[2], 10);
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    
    const parsedDate = new Date(year, month, day, hours, minutes);
    // Verifica que la fecha resultante sea válida
    if (isNaN(parsedDate.getTime())) {
      return null;
    }
    return parsedDate;
  };

  const saveTask = async () => {
    // Validación básica de campos obligatorios
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

    // Guardar la fecha en formato ISO para mayor compatibilidad
    const task = {
      id: Date.now(), // id simple
      name,
      category,
      team,
      dueDate: finalDate.toISOString()
    };

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      tasks.push(task);
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
