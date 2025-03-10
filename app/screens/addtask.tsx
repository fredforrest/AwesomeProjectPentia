import React, { useState } from "react";
import { useTasks } from "../contexts/task.context";
import { SafeAreaView, StyleSheet, View, Button, TextInput} from "react-native";

const AddTask = ({ navigation }) => {
  const { addTask } = useTasks();
  const [newTask, setNewTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
   // function to add task and handles the input fields
  const handleAddTask = () => {
    if (newTask.trim() === '') return; // Avoid empty tasks
    addTask({ title: newTask, description, completed: false }); // Add task with title, description, dueDate, and completed as false
    setNewTask(''); // Clear input field after adding task
    setDescription(''); // Clear description input
    navigation.goBack(); // Navigate back to previous screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.taskText}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter a new task..."
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.taskText}
          placeholder="Enter a description..."
          onChangeText={setDescription}
          value={description}
        />

        <View style={styles.dueDateContainer}>         
        </View>
        <Button title="Add task" onPress={handleAddTask} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    paddingTop: 50,
    
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    marginTop: 25,
    marginHorizontal: 16,
    flex: 0.25,
    
  },
  taskText: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerLabel: {
    color: '#fff',
    fontSize: 16,
  },
  datePicker: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0.8,
  },
});

export default AddTask;
