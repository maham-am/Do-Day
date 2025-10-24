import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ProgressRing = ({ progress, size = 60, strokeWidth = 6, color = null }) => {
  const { theme } = useTheme();
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const progressColor = color || theme.colors.primary;

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundCircle: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: strokeWidth,
      borderColor: theme.colors.border,
    },
    progressCircle: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: strokeWidth,
      borderColor: 'transparent',
      borderTopColor: progressColor,
      transform: [{ rotate: '-90deg' }],
    },
    progressArc: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: strokeWidth,
      borderColor: 'transparent',
    },
  });

  const getProgressArc = () => {
    if (progress <= 25) {
      return {
        borderTopColor: progressColor,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      };
    } else if (progress <= 50) {
      return {
        borderTopColor: progressColor,
        borderRightColor: progressColor,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      };
    } else if (progress <= 75) {
      return {
        borderTopColor: progressColor,
        borderRightColor: progressColor,
        borderBottomColor: progressColor,
        borderLeftColor: 'transparent',
      };
    } else {
      return {
        borderTopColor: progressColor,
        borderRightColor: progressColor,
        borderBottomColor: progressColor,
        borderLeftColor: progressColor,
      };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <View 
        style={[
          styles.progressArc,
          {
            ...getProgressArc(),
          }
        ]}
      />
    </View>
  );
};

export default ProgressRing;
