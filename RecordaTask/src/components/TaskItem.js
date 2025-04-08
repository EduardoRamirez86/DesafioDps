// src/components/TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const getColorByDate = (dueDateISO) => {
  const dueDate = new Date(dueDateISO);
  const today = new Date();
  const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const normalizedToday = normalizeDate(today);
  const normalizedDue = normalizeDate(dueDate);

  if (normalizedDue.getTime() === normalizedToday.getTime()) {
    return 'green';
  } else if (normalizedDue < normalizedToday) {
    return 'red';
  } else {
    return 'blue';
  }
};

const TaskItem = ({ task, onDelete, onEdit }) => {
  const reminderColor = getColorByDate(task.dueDate);
  const displayDate = new Date(task.dueDate).toLocaleString();

  return (
    <View style={[styles.itemContainer, { borderLeftColor: reminderColor }]}>
      <TouchableOpacity style={styles.info} onPress={() => onEdit(task)}>
        <Text style={styles.taskName}>{task.name}</Text>
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
    marginVertical: 5,
    padding: 15,
    borderRadius: 5,
    borderLeftWidth: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  taskCategory: {
    marginTop: 5
  },
  taskTeam: {
    marginTop: 5,
    fontStyle: 'italic'
  },
  taskDue: {
    marginTop: 5,
    color: '#555'
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold'
  }
});

export default TaskItem;
