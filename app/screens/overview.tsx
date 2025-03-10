import { SafeAreaView, StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import React from 'react';
import { useTasks } from '../contexts/task.context';
import { TaskItem } from '../components/TaskItem';

const Overview = ({ navigation }) => {

    const {tasks, clearTasks } = useTasks();

    //function to clear all tasks and show alert popup
    const handleClearTasks = () => {clearTasks(); Alert.alert('Tasks are cleared')};

    // a function to filter completed tasks marked as done
    const notCompletedTasks = tasks.filter(task => !task.completed);
    
    return (
      //Insert all views and components from App.tsx
        <SafeAreaView style={styles.background}>
            
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>To-Do</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <Button title="Add something to do" onPress={() => navigation.navigate('Add Task')} />
                {tasks.length > 0 && (
                    <Button title="Clear" onPress={handleClearTasks} />
                )}
            </View>
      
            {/* separator */}
          <View style={styles.separator}></View>
      
          {tasks.length === 0 ? (
              <Text style={styles.errorNoTasks}>No tasks, why dont you add some?</Text>
            ) : (
                <FlatList
                style={styles.tasksContainer}
                data={notCompletedTasks}
                renderItem={({ item }) => 
                <TaskItem 
                task={item}
                onPressGoToDetails={() => navigation.navigate("Task Details", {task: item})} />}
                keyExtractor={(item, index) => index.toString()} //unique key for each item when searching and displaying list later on
            />
            )}
            <Button title="Completed Tasks" onPress={() => navigation.navigate('Completed Tasks')} />
        </SafeAreaView>
      )
  }
  
  const styles = StyleSheet.create({
    background: {
      backgroundColor: "#3b3b3b",
      flex: 1,
    },
    buttonsContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    headerContainer: {
      padding: 20,
      backgroundColor: '#6200ee',
      alignItems: 'center',
      marginBottom: 10,

    },
    headerText: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
    },
    addTaskContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      marginHorizontal: 16,
    },
    taskText: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      backgroundColor: '#fff',
    },
    separator: {
      height: 6,
      backgroundColor: '#6200ee',
    },
    tasksContainer: {
      paddingTop: 10,
    },
    errorNoTasks: {
      color: '#ababab',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
  });
  
  export default Overview;