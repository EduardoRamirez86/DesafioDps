// src/components/TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Función para determinar el color según la fecha de entrega
const getColorByDate = (dueDateISO) => {
  const dueDate = new Date(dueDateISO);
  const today = new Date();
  const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const normalizedToday = normalizeDate(today);
  const normalizedDue = normalizeDate(dueDate);

  if (normalizedDue.getTime() === normalizedToday.getTime()) {
    return '#28a745'; // Verde
  } else if (normalizedDue < normalizedToday) {
    return '#dc3545'; // Rojo
  } else {
    return '#007bff'; // Azul
  }
};

const TaskItem = ({ task, onDelete, onEdit }) => {
  const reminderColor = getColorByDate(task.dueDate);
  const displayDate = new Date(task.dueDate).toLocaleString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={[styles.itemContainer, { borderLeftColor: reminderColor }]}>
      <TouchableOpacity style={styles.info} onPress={() => onEdit(task)}>
        <View style={styles.header}>
          <Text style={styles.taskName}>{task.name}</Text>
          <View style={[styles.statusDot, { backgroundColor: reminderColor }]} />
        </View>
        <Text style={styles.taskCategory}>Materia: {task.category}</Text>
        {task.team && <Text style={styles.taskTeam}>Equipo: {task.team}</Text>}
        <Text style={styles.taskDue}>Entrega: {displayDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  taskCategory: {
    marginTop: 5,
    color: '#555',
  },
  taskTeam: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#777',
  },
  taskDue: {
    marginTop: 5,
    color: '#888',
  },
  deleteText: {
    color: '#dc3545',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default TaskItem;
