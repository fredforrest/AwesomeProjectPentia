import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Overview from './app/screens/overview';
import { TaskProvider } from './app/contexts/task.context';
import TaskDetails from './app/screens/taskdetails';
import AddTask from './app/screens/addtask';
import CompletedTasks from './app/screens/completedtasks.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {

  const scrOptions = {
    headerStyle: {backgroundColor: '#6200ee'},
    headerTitleStyle: {color: 'white'},
    headerBackTitleVisible: false,
    headerTintColor: 'white'
  }

  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={scrOptions}>
          <Stack.Screen name="Overview" options={{ headerShown: false}} component={Overview} />
          <Stack.Screen name="Task Details" component={TaskDetails} />
          <Stack.Screen name="Add Task" component={AddTask} />
          <Stack.Screen name="Completed Tasks" component={CompletedTasks} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  )
}

export default App;
