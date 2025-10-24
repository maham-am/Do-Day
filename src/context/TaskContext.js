import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case 'ADD_TASK':
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        category: action.payload.category || 'Personal',
        completed: false,
        createdAt: new Date().toISOString(),
        priority: action.payload.priority || 'medium',
        time: action.payload.time || null,
        description: action.payload.description || '',
        habitId: action.payload.habitId || null,
        subtasks: action.payload.subtasks || [],
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    case 'UPDATE_SUBTASKS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, subtasks: action.payload.subtasks }
            : task
        ),
      };
    case 'TOGGLE_SUBTASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks?.map(subtask =>
                  subtask.id === action.payload.subtaskId
                    ? { ...subtask, completed: !subtask.completed }
                    : subtask
                ) || []
              }
            : task
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        currentFilter: action.payload,
      };
    case 'LOAD_HABITS':
      return {
        ...state,
        habits: action.payload,
      };
    case 'ADD_HABIT':
      const newHabit = {
        id: Date.now().toString(),
        title: action.payload.title,
        category: action.payload.category,
        icon: action.payload.icon,
        color: action.payload.color,
        tasks: [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        habits: [...state.habits, newHabit],
      };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  habits: [],
  currentFilter: 'All',
  loading: true,
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [state.tasks]);

  const loadTasks = async () => {
    try {
      // Temporarily force load mock data
      // const savedTasks = await AsyncStorage.getItem('tasks');
      // if (savedTasks) {
      //   dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
      // } else {
      
        // Add some sample regular tasks
        const sampleTasks = [
          {
            id: '1',
            title: 'Create project make to do app',
            category: 'Work',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'high',
            time: '9:00 - 17:00',
            description: 'Develop a comprehensive todo application',
            important: true,
            subtasks: [
              { id: 1, text: "Plan app structure and features", completed: true },
              { id: 2, text: "Set up development environment", completed: true },
              { id: 3, text: "Create user interface design", completed: false },
              { id: 4, text: "Implement task management functionality", completed: false },
              { id: 5, text: "Add dark mode support", completed: false },
              { id: 6, text: "Test and debug the application", completed: false }
            ]
          },
          {
            id: '2',
            title: 'Complete sociology assignment',
            category: 'Education',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'high',
            time: '14:00 - 18:00',
            description: 'Finish sociology research paper',
            subtasks: [
              { id: 1, text: "Research topic and gather sources", completed: true },
              { id: 2, text: "Create outline and structure", completed: false },
              { id: 3, text: "Write introduction and thesis", completed: false },
              { id: 4, text: "Develop main arguments", completed: false },
              { id: 5, text: "Write conclusion and references", completed: false },
              { id: 6, text: "Proofread and final review", completed: false }
            ]
          },
          {
            id: '3',
            title: 'Press uniform',
            category: 'Personal',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'medium',
            time: '19:00 - 20:00',
            description: 'Iron and prepare work uniform',
            subtasks: [
              { id: 1, text: "Sort clothes by type", completed: false },
              { id: 2, text: "Set up ironing board", completed: false },
              { id: 3, text: "Iron shirts and pants", completed: false },
              { id: 4, text: "Hang clothes properly", completed: false },
              { id: 5, text: "Check for any wrinkles", completed: false }
            ]
          },
          {
            id: '4',
            title: 'Read books',
            category: 'Personal',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'medium',
            time: '21:00 - 22:00',
            description: 'Daily reading session',
            subtasks: [
              { id: 1, text: "Choose book to read", completed: true },
              { id: 2, text: "Find comfortable reading spot", completed: false },
              { id: 3, text: "Read for 30 minutes", completed: false },
              { id: 4, text: "Take notes on key points", completed: false },
              { id: 5, text: "Update reading progress", completed: false }
            ]
          },
        ];
        dispatch({ type: 'LOAD_TASKS', payload: sampleTasks });

        // Add sample habits matching the design
        const sampleHabits = [
          {
            id: 'habit1',
            title: 'Meditation',
            category: 'Mindfulness',
            icon: 'leaf',
            color: '#06B6D4',
            tasks: [],
            createdAt: new Date().toISOString(),
          },
          {
            id: 'habit2',
            title: 'Drink water',
            category: 'Health',
            icon: 'water',
            color: '#3B82F6',
            tasks: [],
            createdAt: new Date().toISOString(),
          },
          {
            id: 'habit3',
            title: 'Sleep 8 hours daily',
            category: 'Health',
            icon: 'moon',
            color: '#1E40AF',
            tasks: [],
            createdAt: new Date().toISOString(),
          },
          {
            id: 'habit4',
            title: 'Gym workouts',
            category: 'Fitness',
            icon: 'fitness',
            color: '#F59E0B',
            tasks: [],
            createdAt: new Date().toISOString(),
          },
        ];

        // Add sample habit tasks
        const habitTasks = [
          // Meditation habit tasks
          {
            id: 'habit-task-1',
            title: 'Morning yoga with stretching',
            category: 'Health',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'medium',
            time: '9:00',
            description: 'Morning yoga session',
            habitId: 'habit1',
          },
          {
            id: 'habit-task-2',
            title: 'Relaxing bedtime meditation',
            category: 'Health',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'medium',
            time: '21:00',
            description: 'Evening meditation',
            habitId: 'habit1',
          },
          {
            id: 'habit-task-3',
            title: 'Mindful breathing exercise',
            category: 'Health',
            completed: true,
            createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            priority: 'low',
            time: '15:00',
            description: '5-minute breathing exercise',
            habitId: 'habit1',
          },
          
          // Drink water habit tasks
          {
            id: 'habit-task-4',
            title: 'Drink 8 glasses of water',
            category: 'Health',
            completed: true,
            createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            priority: 'high',
            time: 'All day',
            description: 'Stay hydrated',
            habitId: 'habit2',
          },
          {
            id: 'habit-task-5',
            title: 'Morning hydration routine',
            category: 'Health',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'high',
            time: '7:00',
            description: 'Drink 2 glasses of water',
            habitId: 'habit2',
          },
          {
            id: 'habit-task-6',
            title: 'Evening water intake',
            category: 'Health',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'medium',
            time: '19:00',
            description: 'Drink 1 glass before dinner',
            habitId: 'habit2',
          },
          
          // Sleep habit tasks
          {
            id: 'habit-task-7',
            title: 'Set bedtime alarm',
            category: 'Health',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'medium',
            time: '22:00',
            description: 'Prepare for 8-hour sleep',
            habitId: 'habit3',
          },
          {
            id: 'habit-task-8',
            title: 'No screen time before bed',
            category: 'Health',
            completed: true,
            createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            priority: 'high',
            time: '21:30',
            description: 'Avoid screens 30 minutes before sleep',
            habitId: 'habit3',
          },
          
          // Gym workout habit tasks
          {
            id: 'habit-task-9',
            title: 'Morning cardio session',
            category: 'Fitness',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'high',
            time: '6:30',
            description: '30-minute cardio workout',
            habitId: 'habit4',
          },
          {
            id: 'habit-task-10',
            title: 'Strength training',
            category: 'Fitness',
            completed: true,
            createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            priority: 'high',
            time: '18:00',
            description: 'Upper body strength training',
            habitId: 'habit4',
          },
          {
            id: 'habit-task-11',
            title: 'Post-workout stretching',
            category: 'Fitness',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'medium',
            time: '19:00',
            description: '15-minute stretching routine',
            habitId: 'habit4',
          },
        ];

        // Combine regular tasks with habit tasks
        const allTasks = [...sampleTasks, ...habitTasks];
        dispatch({ type: 'LOAD_TASKS', payload: allTasks });
        dispatch({ type: 'LOAD_HABITS', payload: sampleHabits });
        
        // Clear AsyncStorage to ensure fresh data
        await AsyncStorage.clear();
    } catch (error) {
      console.error('Error loading tasks:', error);
      dispatch({ type: 'LOAD_TASKS', payload: [] });
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = (taskData) => {
    dispatch({ type: 'ADD_TASK', payload: taskData });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const updateTask = (taskId, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, updates } });
  };

  const updateSubtasks = (taskId, subtasks) => {
    dispatch({ type: 'UPDATE_SUBTASKS', payload: { taskId, subtasks } });
  };

  const toggleSubtask = (taskId, subtaskId) => {
    dispatch({ type: 'TOGGLE_SUBTASK', payload: { taskId, subtaskId } });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const getFilteredTasks = () => {
    if (state.currentFilter === 'All') {
      return state.tasks;
    }
    return state.tasks.filter(task => task.category === state.currentFilter);
  };

  const getTodayTasks = () => {
    // For now, show all incomplete tasks regardless of date
    return state.tasks.filter(task => !task.completed && !task.habitId);
  };

  const getCompletedTasks = () => {
    // Show all completed tasks regardless of date
    return state.tasks.filter(task => task.completed && !task.habitId);
  };

  const getTaskInsights = () => {
    const today = new Date().toDateString();
    const allTodayTasks = state.tasks.filter(task => {
      const taskDate = new Date(task.createdAt).toDateString();
      return taskDate === today && !task.habitId;
    });
    const completedToday = allTodayTasks.filter(task => task.completed);
    const totalToday = allTodayTasks.length;
    const completionRate = totalToday > 0 ? (completedToday.length / totalToday) * 100 : 0;
    
    return {
      total: totalToday,
      completed: completedToday.length,
      completionRate: Math.round(completionRate),
    };
  };

  const addHabit = (habitData) => {
    dispatch({ type: 'ADD_HABIT', payload: habitData });
  };

  const getHabitsByCategory = (category) => {
    return state.habits.filter(habit => habit.category === category);
  };

  const getHabitTasks = (habitId) => {
    return state.tasks.filter(task => task.habitId === habitId);
  };

  const getTodayHabits = () => {
    return state.habits.filter(habit => {
      const today = new Date().toDateString();
      const habitDate = new Date(habit.createdAt).toDateString();
      return habitDate === today;
    });
  };

  const getCompletedToday = () => {
    return state.habits.filter(habit => {
      // Mock completion logic - in real app, this would check actual completion
      return Math.random() > 0.5;
    });
  };

  const getTasksByDate = (date) => {
    if (!date) return [];
    
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return state.tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === targetDate.getTime();
    });
  };

  const value = {
    ...state,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    updateSubtasks,
    toggleSubtask,
    setFilter,
    getFilteredTasks,
    getTodayTasks,
    getCompletedTasks,
    getTaskInsights,
    addHabit,
    getHabitsByCategory,
    getHabitTasks,
    getTodayHabits,
    getCompletedToday,
    getTasksByDate,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
