import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { fileManagerStyles } from '../styles/fileManagerStyles';

export default function CreateFileModal({
  visible,
  name,
  content,
  onChangeName,
  onChangeContent,
  onCancel,
  onCreate,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={fileManagerStyles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={fileManagerStyles.modalCard}>
                <Text style={fileManagerStyles.title}>Новий .txt файл</Text>
                <TextInput
                  style={fileManagerStyles.input}
                  value={name}
                  onChangeText={onChangeName}
                  placeholder="Назва файлу"
                />
                <TextInput
                  style={[fileManagerStyles.input, { height: 100 }]}
                  value={content}
                  onChangeText={onChangeContent}
                  placeholder="Початковий текст"
                  multiline
                />
                <View style={fileManagerStyles.modalActions}>
                  <TouchableOpacity onPress={onCancel}>
                    <Text style={fileManagerStyles.linkText}>Скасувати</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onCreate}>
                    <Text style={fileManagerStyles.linkText}>Створити</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
