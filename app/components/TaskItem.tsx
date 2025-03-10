import React from 'react';
import {StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useTasks } from '../contexts/task.context';

export const TaskItem = ({task, onPressGoToDetails} : any) => {
    const {updateTask} = useTasks();

    // Function to mark a task as done using the updateTask function from the TaskContext
    const markDone = () => {
        updateTask({...task, completed: true})
    }

    return (
      <Pressable onPress={onPressGoToDetails} style={styles.task}>
          <View style={styles.taskTextContainer}>
              <Text style={styles.taskText}>{task.title}</Text>
          </View>
          <Button title={"Done"} onPress={() => markDone()} />
      </Pressable>
  )
}

const styles = StyleSheet.create({
    task: {
        backgroundColor: '#f9f9f9',
        padding: 8,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        marginHorizontal: 16
    },
    taskTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    taskText: {
        fontSize: 17,
    },
})