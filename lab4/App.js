import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FileManagerScreen from './src/screens/FileManagerScreen';
import TextEditorScreen from './src/screens/TextEditorScreen';

export default function App() {
  const [activeFile, setActiveFile] = useState(null);
  const [currentDir, setCurrentDir] = useState(FileSystem.documentDirectory);

  const openFile = (filePath, fileName) => {
    setActiveFile({ filePath, fileName });
  };

  const goBack = () => {
    setActiveFile(null);
  };

  return (
    <SafeAreaProvider>
      {activeFile ? (
        <TextEditorScreen
          filePath={activeFile.filePath}
          fileName={activeFile.fileName}
          onBack={goBack}
        />
      ) : (
        <FileManagerScreen
          onOpenFile={openFile}
          currentDir={currentDir}
          onChangeDir={setCurrentDir}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
