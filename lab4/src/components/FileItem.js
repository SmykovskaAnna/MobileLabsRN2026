import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { fileManagerStyles } from '../styles/fileManagerStyles';

export default function FileItem({ item, onOpen, onInfo, onDelete, onRename }) {
  return (
    <View style={fileManagerStyles.item}>
      <TouchableOpacity onPress={() => onOpen(item)}>
        <Text style={fileManagerStyles.itemName}>{item.name}</Text>
        <Text style={fileManagerStyles.itemMeta}>
          {item.isDirectory ? 'Папка' : item.extension ? `Файл (${item.extension})` : 'Файл'}
        </Text>
      </TouchableOpacity>
      <View style={fileManagerStyles.itemRow}>
        <View />
        <View style={fileManagerStyles.itemButtons}>
          <TouchableOpacity style={fileManagerStyles.smallButton} onPress={() => onInfo(item)}>
            <Text style={fileManagerStyles.smallButtonText}>Деталі</Text>
          </TouchableOpacity>
          <TouchableOpacity style={fileManagerStyles.smallButton} onPress={() => onRename(item)}>
            <Text style={fileManagerStyles.smallButtonText}>Перейм.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={fileManagerStyles.smallButton} onPress={() => onDelete(item)}>
            <Text style={fileManagerStyles.dangerText}>Видалити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
