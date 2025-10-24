import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = {
    colors: {
      primary: '#4A7C59', // Dark green from images
      primaryLight: '#6B9B7A',
      background: isDarkMode ? '#1A1A1A' : '#FDFCEF', // Dark or light background
      surface: isDarkMode ? '#2D2D2D' : '#F8F9FA',
      card: isDarkMode ? '#2D2D2D' : '#FDFCEF', // Dark or light cards
      text: isDarkMode ? '#FFFFFF' : '#2D5016', // White or dark green text
      textSecondary: isDarkMode ? '#B0B0B0' : '#6B7280', // Light or gray secondary text
      textMuted: isDarkMode ? '#808080' : '#9CA3AF',
      border: isDarkMode ? '#404040' : '#E5E7EB',
      success: '#4A7C59',
      warning: '#D97706', // Orange for partial completion
      error: '#EF4444',
      completed: isDarkMode ? '#808080' : '#9CA3AF',
      // New colors for the design
      flagRed: '#EF4444',
      flagOrange: '#F59E0B', 
      flagGreen: '#10B981',
      flagLightGreen: '#84CC16',
      cream: isDarkMode ? '#1A1A1A' : '#FDFCEF',
      lightGreen: isDarkMode ? '#2D2D2D' : '#F0FDF4',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
      },
    },
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
