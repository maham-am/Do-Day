import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ProgressIndicator = ({ progress, size = 40 }) => {
  const { theme } = useTheme();

  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressArc: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: 'transparent',
      borderTopColor: theme.colors.primary,
      transform: [{ rotate: '-90deg' }],
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View 
          style={[
            styles.progressArc,
            {
              borderTopColor: progress > 0 ? theme.colors.primary : 'transparent',
              borderRightColor: progress > 25 ? theme.colors.primary : 'transparent',
              borderBottomColor: progress > 50 ? theme.colors.primary : 'transparent',
              borderLeftColor: progress > 75 ? theme.colors.primary : 'transparent',
            }
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressIndicator;