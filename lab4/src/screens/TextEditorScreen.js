import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { editorStyles } from '../styles/editorStyles';

export default function TextEditorScreen({ filePath, fileName, onBack }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadFile = async () => {
      try {
        const content = await FileSystem.readAsStringAsync(filePath);
        if (mounted) setText(content);
      } catch (error) {
        Alert.alert('Помилка', 'Не вдалося відкрити файл.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadFile();
    return () => {
      mounted = false;
    };
  }, [filePath]);

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(filePath, text);
      Alert.alert('Готово', 'Файл збережено.');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти файл.');
    }
  };

  return (
    <SafeAreaView style={editorStyles.screen} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={editorStyles.header}>
              <Text style={editorStyles.title}>{fileName}</Text>
            </View>

            <TextInput
              style={editorStyles.input}
              value={text}
              onChangeText={setText}
              multiline
              editable={!loading}
              placeholder={loading ? 'Завантаження...' : 'Текст файлу'}
            />

            <View style={editorStyles.actions}>
              <TouchableOpacity style={editorStyles.secondaryButton} onPress={onBack}>
                <Text style={editorStyles.secondaryText}>Назад</Text>
              </TouchableOpacity>
              <TouchableOpacity style={editorStyles.actionButton} onPress={saveFile}>
                <Text style={editorStyles.actionText}>Зберегти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
