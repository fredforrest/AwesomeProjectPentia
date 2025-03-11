import { SafeAreaView, StyleSheet, Text, View, Button, FlatList, Alert, TextInput } from "react-native";
import React from 'react';
import { useTasks } from '../contexts/task.context';
import { TaskItem } from '../components/TaskItem';


const Overview = ({ navigation }) => {

    const {tasks, clearTasks } = useTasks();
    const [searchedTask, setSearchedTask] = React.useState('');

    //function to clear all tasks and show alert popup
    const handleClearTasks = () => {clearTasks(); Alert.alert('Tasks are cleared')};

    // a function to filter completed tasks marked as done and not overdue
    const notCompletedAndNotOverdueTasks = tasks.filter(task => !task.completed && !task.isOverdue);    

    // a function to search for tasks based on the input while keeping the notCompletedTasks
    const searchTasks = notCompletedAndNotOverdueTasks.filter(task => task.title.toLowerCase().includes(searchedTask.toLowerCase()));
   
    // a function to filter tasks that are overdue
    const overDueAndNotCompletedTasks = tasks.filter(task => !task.completed && task.isOverdue);    

    return (
      //Insert all views and components from App.tsx
        <SafeAreaView style={styles.background}>

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>To-Do</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TextInput style={styles.taskText}
                  value={searchedTask} 
                   placeholder="Search ..."
                   onChangeText={setSearchedTask}>
              </TextInput>
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
                data={searchTasks}
                renderItem={({ item }) => 
                <TaskItem 
                task={item}
                onPressGoToDetails={() => navigation.navigate("Task Details", {task: item})} />}
            />
            )}

            <View style={styles.separator}></View>
            {overDueAndNotCompletedTasks.length > 0 && (
                <>
                    <Text style={styles.errorNoTasks}>You have some overdue tasks</Text>
                    <FlatList
                        style={styles.overdueTasksContainer}
                        data={overDueAndNotCompletedTasks}
                        renderItem={({ item }) =>
                            <TaskItem
                                style={styles.overdueTaskItem}
                                task={item}
                                onPressGoToDetails={() =>
                                navigation.navigate("Task Details", { task: item })}
                            />
                        }
                    />
                </>
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
      marginTop: 8,
    },
    tasksContainer: {
      paddingTop: 10,
    },
    errorNoTasks: {
      color: '#ababab',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    overdueTasksContainer: {
      marginTop: 10,
    },
    overdueTaskItem: {
      backgroundColor: 'red',

    },

  });
  
  export default Overview;