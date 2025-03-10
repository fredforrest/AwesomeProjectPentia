import React, { useState } from "react";
import { useTasks } from "../contexts/task.context";
import { SafeAreaView, StyleSheet, View, Button, TextInput, Text} from "react-native";


const AddTask = ({ navigation }) => {
  const { addTask } = useTasks();
  const [newTask, setNewTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const handleAddTask = () => {
    if (newTask.trim() === '') return; // Avoid empty tasks
    addTask({ title: newTask, description, dueDate, completed: false }); // Add task with title, description, dueDate, and completed as false
    setNewTask(''); // Clear input field after adding task
    setDescription(''); // Clear description input
    setDueDate(new Date()); // Reset dueDate
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
          <Text style={styles.datePickerLabel}>Select a due date:</Text>            

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
  },
  datePickerLabel: {
    color: '#fff',
    fontSize: 16,
  },
  datePicker: {
    width: '100%',
    backgroundColor: '#fff',
    opacity: 0.8,
  },
});

export default AddTask;
