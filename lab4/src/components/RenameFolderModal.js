import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { fileManagerStyles } from '../styles/fileManagerStyles';

export default function RenameModal({ visible, name, onChangeName, onCancel, onRename, isDirectory }) {
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
                <Text style={fileManagerStyles.title}>
                  {isDirectory ? 'Перейменувати папку' : 'Перейменувати файл'}
                </Text>
                <TextInput
                  style={fileManagerStyles.input}
                  value={name}
                  onChangeText={onChangeName}
                  placeholder="Нова назва"
                  autoFocus
                />
                <View style={fileManagerStyles.modalActions}>
                  <TouchableOpacity onPress={onCancel}>
                    <Text style={fileManagerStyles.linkText}>Скасувати</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onRename}>
                    <Text style={fileManagerStyles.linkText}>Зберегти</Text>
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
