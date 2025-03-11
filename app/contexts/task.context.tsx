import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Task interface nu med title og description
interface Task{
  title:string;
  description:string;
  dueDate?: Date;
  completed: boolean;
  isOverdue?: boolean;
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

    // Function to update the overdue status of tasks
    const updateOverdueStatus = (tasks: Task[]): Task[] => {
      const now = new Date();
      return tasks.map(task => ({
        ...task,
        isOverdue: task.dueDate ? new Date(task.dueDate) < now : false,
      }));
    };

    // Load tasks from storage and update overdue status
    useEffect(() => {
      const loadTasks = async () => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          setTasks(updateOverdueStatus(parsedTasks)); // Update overdue status after loading
        }
      };
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
  const addTask = (newTask: Task) => {
    const updatedTasks = updateOverdueStatus([...tasks, newTask]);
    setTasks(updatedTasks);
  };

  // Updates a task to be marked as Done
 const updateTask = (taskToUpdate: Task) => {
    const updatedTasks = updateOverdueStatus(
      tasks.map(task => (task.title === taskToUpdate.title ? taskToUpdate : task))
    );
    setTasks(updatedTasks);
  };

  //fjern en task - se hvordan du gjorde i app.tsx ved flatlisten
  const removeTask = (taskToRemove: Task) => {
    const updatedTasks = updateOverdueStatus(
      tasks.filter(task => task.title !== taskToRemove.title)
    );
    setTasks(updatedTasks);
  };

  
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