import React, { useState } from "react";
import { useTasks } from "../contexts/task.context";
import { SafeAreaView, StyleSheet, View, Button, TextInput, Alert} from "react-native";
import DatePicker from 'react-native-date-picker'



const AddTask = ({ navigation }) => {
  const { addTask } = useTasks();
  const [newTask, setNewTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState(new Date());
  
   // function to add task and handles the input fields
  const handleAddTask = () => {
    if (newTask.trim() === '') return Alert.alert('Add a title and description'); // Avoid empty tasks
    addTask({ title: newTask, description, dueDate, completed: false }); // Add task with title, description, dueDate, and completed as false
    setNewTask(''); // Clear input field after adding task
    setDescription(''); // Clear description input
    setDueDate(new Date()); // Clear due date input
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
          <DatePicker 
            date={dueDate}
            onDateChange={setDueDate}
            mode="date">
          </DatePicker> 
        </View>
        <Button title="Add" onPress={handleAddTask} />
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
    flex: 0.55,
    
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
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  datePickerLabel: {
    color: '#fff',
    fontSize: 16,
  },
  datePicker: {
    backgroundColor: '#fff',
    opacity: 0.8,
    marginTop: 10,
  },
});

export default AddTask;
