import React from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from "react-native";
import { useTasks } from '../contexts/task.context';



const CompletedTasks = ( {navigation} ) => {

  // using the useTasks hook to get the tasks
    const {tasks} = useTasks();

    // Filtering tasks that are completed
    const completedTasks = tasks.filter((task) => task.completed);


  return (
    <SafeAreaView style={styles.parentContainer}>
    <View style={styles.childContainer}>
      <Text style={styles.text}> You have {completedTasks.length.toString()} completed tasks</Text>
        <FlatList
            style={styles.taskContainer}
            data={completedTasks}
            keyExtractor={(item) => item.title}
            renderItem={({item}) => (
                <View style={styles.taskContainer}>
                  <View style={styles.taskHeader}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                  </View>
                    <Text style={styles.taskDescription}>{item.description}</Text>
                </View>
            )}
        />
    </View>
    </SafeAreaView>
  );  
};

const styles = StyleSheet.create({
  parentContainer: {
      flex: 1,
      backgroundColor: '#3b3b3b',
  },
  childContainer: {
      justifyContent: 'center',
  },
  text: {
      color: '#fff',
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  taskContainer: {
      borderColor: '#6200ee',
      padding: 10,
      borderWidth: 1,
      backgroundColor: '#424242', 
      marginBottom: 10,  
  },
  taskHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
  },
  taskTitle: {
      fontSize: 18,
      color: '#fff', 
  },
  taskDescription: {
      fontSize: 16, 
      color: '#bbb', 
      marginTop: 10,
  },
});


export default CompletedTasks;