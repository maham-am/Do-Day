import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitsContext = createContext();

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};

const habitsReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_HABITS':
      return {
        ...state,
        habits: action.payload,
        loading: false,
      };
    case 'ADD_HABIT':
      const newHabit = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        icon: action.payload.icon || 'fitness',
        color: action.payload.color || '#8B5CF6',
        goal: action.payload.goal || 30,
        completed: 0,
        streak: 0,
        longestStreak: 0,
        weeklyProgress: [false, false, false, false, false, false, false],
        tasks: action.payload.tasks || [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        habits: [newHabit, ...state.habits],
      };
    case 'UPDATE_HABIT':
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload.id
            ? { ...habit, ...action.payload.updates }
            : habit
        ),
      };
    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(habit => habit.id !== action.payload),
      };
    case 'MARK_HABIT_COMPLETE':
      return {
        ...state,
        habits: state.habits.map(habit => {
          if (habit.id === action.payload) {
            const today = new Date().getDay();
            const newWeeklyProgress = [...habit.weeklyProgress];
            newWeeklyProgress[today] = true;
            
            return {
              ...habit,
              completed: habit.completed + 1,
              streak: habit.streak + 1,
              longestStreak: Math.max(habit.longestStreak, habit.streak + 1),
              weeklyProgress: newWeeklyProgress,
            };
          }
          return habit;
        }),
      };
    case 'ADD_HABIT_TASK':
      return {
        ...state,
        habits: state.habits.map(habit => {
          if (habit.id === action.payload.habitId) {
            const newTask = {
              id: Date.now().toString(),
              title: action.payload.title,
              time: action.payload.time || '',
              completed: false,
              createdAt: new Date().toISOString(),
            };
            return {
              ...habit,
              tasks: [...habit.tasks, newTask],
            };
          }
          return habit;
        }),
      };
    case 'TOGGLE_HABIT_TASK':
      return {
        ...state,
        habits: state.habits.map(habit => {
          if (habit.id === action.payload.habitId) {
            return {
              ...habit,
              tasks: habit.tasks.map(task =>
                task.id === action.payload.taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            };
          }
          return habit;
        }),
      };
    case 'DELETE_HABIT_TASK':
      return {
        ...state,
        habits: state.habits.map(habit => {
          if (habit.id === action.payload.habitId) {
            return {
              ...habit,
              tasks: habit.tasks.filter(task => task.id !== action.payload.taskId),
            };
          }
          return habit;
        }),
      };
    default:
      return state;
  }
};

const initialState = {
  habits: [],
  loading: true,
};

export const HabitsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitsReducer, initialState);

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    saveHabits();
  }, [state.habits]);

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem('habits');
      if (savedHabits) {
        dispatch({ type: 'LOAD_HABITS', payload: JSON.parse(savedHabits) });
      } else {
        // Add sample habits matching the design
        const sampleHabits = [
          {
            id: '1',
            title: 'Meditation',
            description: 'Daily meditation practice',
            icon: 'meditation',
            color: '#8B5CF6',
            goal: 40,
            completed: 10,
            streak: 3,
            longestStreak: 6,
            weeklyProgress: [true, true, true, true, false, false, false],
            tasks: [
              {
                id: '1-1',
                title: 'Morning yoga with stretching',
                time: '9:00',
                completed: false,
                createdAt: new Date().toISOString(),
              },
              {
                id: '1-2',
                title: 'Relaxing bedtime meditation',
                time: '21:00',
                completed: false,
                createdAt: new Date().toISOString(),
              },
            ],
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Drink water',
            description: 'Stay hydrated throughout the day',
            icon: 'water',
            color: '#3B82F6',
            goal: 34,
            completed: 10,
            streak: 2,
            longestStreak: 5,
            weeklyProgress: [true, true, false, false, false, false, false],
            tasks: [
              {
                id: '2-1',
                title: 'Drink 8 glasses of water',
                time: 'Throughout the day',
                completed: false,
                createdAt: new Date().toISOString(),
              },
            ],
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Sleep 8 hours daily',
            description: 'Maintain healthy sleep schedule',
            icon: 'sleep',
            color: '#6366F1',
            goal: 56,
            completed: 50,
            streak: 7,
            longestStreak: 12,
            weeklyProgress: [true, true, true, true, true, true, true],
            tasks: [
              {
                id: '3-1',
                title: 'Go to bed by 10 PM',
                time: '22:00',
                completed: false,
                createdAt: new Date().toISOString(),
              },
              {
                id: '3-2',
                title: 'Wake up at 6 AM',
                time: '06:00',
                completed: false,
                createdAt: new Date().toISOString(),
              },
            ],
            createdAt: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'Gym workouts',
            description: 'Regular exercise routine',
            icon: 'fitness',
            color: '#F59E0B',
            goal: 120,
            completed: 15,
            streak: 1,
            longestStreak: 8,
            weeklyProgress: [false, false, false, false, false, false, false],
            tasks: [
              {
                id: '4-1',
                title: 'Cardio workout',
                time: '18:00',
                completed: false,
                createdAt: new Date().toISOString(),
              },
              {
                id: '4-2',
                title: 'Strength training',
                time: '19:00',
                completed: false,
                createdAt: new Date().toISOString(),
              },
            ],
            createdAt: new Date().toISOString(),
          },
        ];
        dispatch({ type: 'LOAD_HABITS', payload: sampleHabits });
      }
    } catch (error) {
      console.error('Error loading habits:', error);
      dispatch({ type: 'LOAD_HABITS', payload: [] });
    }
  };

  const saveHabits = async () => {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(state.habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  };

  const addHabit = (habitData) => {
    dispatch({ type: 'ADD_HABIT', payload: habitData });
  };

  const updateHabit = (habitId, updates) => {
    dispatch({ type: 'UPDATE_HABIT', payload: { id: habitId, updates } });
  };

  const deleteHabit = (habitId) => {
    dispatch({ type: 'DELETE_HABIT', payload: habitId });
  };

  const markHabitComplete = (habitId) => {
    dispatch({ type: 'MARK_HABIT_COMPLETE', payload: habitId });
  };

  const addHabitTask = (habitId, taskData) => {
    dispatch({ type: 'ADD_HABIT_TASK', payload: { habitId, ...taskData } });
  };

  const toggleHabitTask = (habitId, taskId) => {
    dispatch({ type: 'TOGGLE_HABIT_TASK', payload: { habitId, taskId } });
  };

  const deleteHabitTask = (habitId, taskId) => {
    dispatch({ type: 'DELETE_HABIT_TASK', payload: { habitId, taskId } });
  };

  const getWeeklyProgress = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
      });
    }
    
    return weekDays;
  };

  const getTodayHabits = () => {
    return state.habits.filter(habit => {
      const today = new Date().getDay();
      return !habit.weeklyProgress[today];
    });
  };

  const getCompletedToday = () => {
    return state.habits.filter(habit => {
      const today = new Date().getDay();
      return habit.weeklyProgress[today];
    });
  };

  const value = {
    ...state,
    addHabit,
    updateHabit,
    deleteHabit,
    markHabitComplete,
    addHabitTask,
    toggleHabitTask,
    deleteHabitTask,
    getWeeklyProgress,
    getTodayHabits,
    getCompletedToday,
  };

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
};

