import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const TaskDetails = ({ route }) => {
  const { task } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Details</Text>
      </View>
      <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      
      <Text style={styles.taskDescription}>{task.description}</Text>
      <Text style={styles.taskDueDate}>Due Date: {task.dueDate}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
  },
  headerContainer:{
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6200ee',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskContainer:{
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  taskTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
  },
  taskDescription: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    padding: 10,
    borderColor: '#6200ee',
    borderWidth: 1,
  },
  taskDueDate: {
    fontSize: 18,
    color: '#fff',
    marginTop: 25,

  },
});

export default TaskDetails;