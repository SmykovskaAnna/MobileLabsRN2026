import React from 'react';
import { View, Text } from 'react-native';
import { fileManagerStyles } from '../styles/fileManagerStyles';

const formatBytes = (bytes) => {
  if (bytes === null || bytes === undefined) return '-';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(1)} ${units[unitIndex]}`;
};

export default function StorageStats({ total, free, used }) {
  return (
    <View style={fileManagerStyles.statsCard}>
      <Text style={fileManagerStyles.title}>Памʼять пристрою</Text>
      <View style={fileManagerStyles.statsRow}>
        <Text style={fileManagerStyles.statsLabel}>Загальний обсяг</Text>
        <Text style={fileManagerStyles.statsValue}>{formatBytes(total)}</Text>
      </View>
      <View style={fileManagerStyles.statsRow}>
        <Text style={fileManagerStyles.statsLabel}>Вільно</Text>
        <Text style={fileManagerStyles.statsValue}>{formatBytes(free)}</Text>
      </View>
      <View style={fileManagerStyles.statsRow}>
        <Text style={fileManagerStyles.statsLabel}>Зайнято</Text>
        <Text style={fileManagerStyles.statsValue}>{formatBytes(used)}</Text>
      </View>
    </View>
  );
}
