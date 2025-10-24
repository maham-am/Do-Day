import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FloatingActionButton = ({ onPress }) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 20,
      left: 16,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#4A7C59',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
