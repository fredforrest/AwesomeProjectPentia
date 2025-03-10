import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Task interface nu med title og description
interface Task{
  title:string;
  description:string;
  dueDate: Date;
  completed: boolean;
}

//Task context interface med task interface som array for at samle begge kontekster
interface TaskContextInterface {
    tasks: Task[]; // an array where each task is a string.
    addTask: (newTask: Task) => void; // function: adds a new task to the list.
    updateTask: (taskToUpdate: Task) => void; // function: updates a task in the
    removeTask: (taskToRemove: Task) => void; // function: deletes a task from the list.
    clearTasks: () => void; // function: wipes out all tasks.
}

// Task Context til CRUD operationer på tasks
const TaskContext = createContext<TaskContextInterface>({
    tasks: [],
    addTask: () => { },
    updateTask: () => { },
    removeTask: () => { },
    clearTasks: () => { }
});

  //task provider komponent der giver adgang til task data og funktioner
  export const TaskProvider = ({ children } : any ) => {
    const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load tasks from storage
    const loadTasks = async () => {
      // Get stored tasks from storage
      const storedTasks = await AsyncStorage.getItem('tasks');
      // If there are stored tasks, set them to the tasks state
      if (storedTasks) {
        //JSON is used because AsyncStorage only stores strings
        setTasks(JSON.parse(storedTasks));
      }
    };
    // call the above function
    loadTasks();
    
  }, []);

  useEffect(() => {
    // Save tasks to storage
    const saveTasks = async () => {
      // Every time tasks change, store the updated tasks
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    };
// call the above function
    saveTasks();
  }, [tasks]);

  //tilføj ny task
  const addTask = (newTask: Task ) => {setTasks([...tasks, newTask])};

  // Updates a task to be marked as Done
  const updateTask = (taskToUpdate: Task) => {
      setTasks(tasks.map(task => (task.title === taskToUpdate.title ? taskToUpdate : task)));
    };

  //fjern en task - se hvordan du gjorde i app.tsx ved flatlisten
  const removeTask = (taskToRemove: Task) => setTasks(tasks.filter(task => task.title !== taskToRemove.title));

//ryd listen af tasks
const clearTasks = async () => { setTasks([]);
    await AsyncStorage.removeItem('tasks'); 
};

  return (
      <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, clearTasks }}>
        {children}
      </TaskContext.Provider>
  );
};

//custom hook til at access task data og funktioner i komponents
export const useTasks = () => useContext(TaskContext);