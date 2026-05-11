import React from 'react';
import { View, Text } from 'react-native';
import { fileManagerStyles } from '../styles/fileManagerStyles';

export default function PathBar({ title }) {
  return (
    <View style={fileManagerStyles.header}>
      <Text style={fileManagerStyles.title}>Файловий менеджер</Text>
      <View style={fileManagerStyles.pathBadge}>
        <Text style={fileManagerStyles.pathText}>{title}</Text>
      </View>
    </View>
  );
}
