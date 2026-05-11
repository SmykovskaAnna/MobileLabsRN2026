import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import PathBar from '../components/PathBar';
import StorageStats from '../components/StorageStats';
import FileItem from '../components/FileItem';
import CreateFolderModal from '../components/CreateFolderModal';
import CreateFileModal from '../components/CreateFileModal';
import RenameModal from '../components/RenameFolderModal';
import { fileManagerStyles } from '../styles/fileManagerStyles';

const baseDir = FileSystem.documentDirectory;

const ensureDir = (path) => (path.endsWith('/') ? path : `${path}/`);

const getRelativePath = (path) => {
  if (!baseDir) return path;
  const trimmed = path.replace(baseDir, '');
  return trimmed.length ? `/${trimmed.replace(/\/$/, '')}` : '/';
};

const getExtension = (name) => {
  const parts = name.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

export default function FileManagerScreen({ onOpenFile, currentDir, onChangeDir }) {
  const setCurrentDir = onChangeDir;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const [stats, setStats] = useState({ total: null, free: null, used: null });

  const [renameTarget, setRenameTarget] = useState(null);
  const [renameName, setRenameName] = useState('');

  const loadStats = useCallback(async () => {
    try {
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();
      const used = total - free;
      setStats({ total, free, used });
    } catch (error) {
      setStats({ total: null, free: null, used: null });
    }
  }, []);

  const loadDirectory = useCallback(
    async (dir) => {
      if (!dir) return;
      setLoading(true);
      try {
        const names = await FileSystem.readDirectoryAsync(dir);
        const entries = await Promise.all(
          names.map(async (name) => {
            const path = `${dir}${name}`;
            const info = await FileSystem.getInfoAsync(path);
            return {
              name,
              path,
              isDirectory: info.isDirectory,
              size: info.size ?? null,
              modificationTime: info.modificationTime ?? null,
              extension: info.isDirectory ? '' : getExtension(name),
            };
          })
        );
        entries.sort((a, b) => {
          if (a.isDirectory !== b.isDirectory) {
            return a.isDirectory ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        });
        setItems(entries);
      } catch (error) {
        Alert.alert('Помилка', 'Не вдалося прочитати папку.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDirectory(currentDir);
  }, [currentDir, loadDirectory]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const goUp = () => {
    if (!currentDir || currentDir === baseDir) return;
    const trimmed = currentDir.endsWith('/') ? currentDir.slice(0, -1) : currentDir;
    const parent = trimmed.substring(0, trimmed.lastIndexOf('/') + 1);
    setCurrentDir(parent || baseDir);
  };

  const openItem = (item) => {
    if (item.isDirectory) {
      setCurrentDir(ensureDir(item.path));
      return;
    }
    onOpenFile(item.path, item.name);
  };

  const showInfo = (item) => {
    const type = item.isDirectory
      ? 'Папка'
      : item.extension
      ? `Файл (${item.extension})`
      : 'Файл';
    const size = item.size != null ? `${item.size} B` : '-';
    const date = item.modificationTime
      ? new Date(item.modificationTime * 1000).toLocaleString()
      : '-';
    Alert.alert(
      'Інформація про файл',
      `Назва: ${item.name}\nТип: ${type}\nРозмір: ${size}\nОстання зміна: ${date}`
    );
  };

  const deleteItem = (item) => {
    Alert.alert('Підтвердження', `Видалити ${item.name}?`, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(item.path, { idempotent: true });
            loadDirectory(currentDir);
          } catch (error) {
            Alert.alert('Помилка', 'Не вдалося видалити.');
          }
        },
      },
    ]);
  };

  const openRename = (item) => {
    setRenameTarget(item);
    setRenameName(item.name);
  };

  const renameItem = async () => {
    const newName = renameName.trim();
    if (!newName) {
      Alert.alert('Увага', 'Введіть нову назву.');
      return;
    }
    if (newName === renameTarget.name) {
      Keyboard.dismiss();
      setRenameTarget(null);
      return;
    }
    try {
      const newPath = renameTarget.isDirectory
        ? `${currentDir}${newName}/`
        : `${currentDir}${newName}`;
      await FileSystem.moveAsync({ from: renameTarget.path, to: newPath });
      Keyboard.dismiss();
      setRenameTarget(null);
      setRenameName('');
      loadDirectory(currentDir);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося перейменувати.');
    }
  };

  const createFolder = async () => {
    const name = folderName.trim();
    if (!name) {
      Alert.alert('Увага', 'Введіть назву папки.');
      return;
    }
    try {
      await FileSystem.makeDirectoryAsync(`${currentDir}${name}/`, { intermediates: true });
      Keyboard.dismiss();
      setFolderName('');
      setShowFolderModal(false);
      loadDirectory(currentDir);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося створити папку.');
    }
  };

  const createFile = async () => {
    const name = fileName.trim();
    if (!name) {
      Alert.alert('Увага', 'Введіть назву файлу.');
      return;
    }
    const safeName = name.endsWith('.txt') ? name : `${name}.txt`;
    try {
      await FileSystem.writeAsStringAsync(`${currentDir}${safeName}`, fileContent || '');
      Keyboard.dismiss();
      setFileName('');
      setFileContent('');
      setShowFileModal(false);
      loadDirectory(currentDir);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося створити файл.');
    }
  };

  return (
    <SafeAreaView style={fileManagerStyles.screen} edges={['top', 'left', 'right']}>
      <PathBar title={`Шлях: ${getRelativePath(currentDir)}`} />
      <StorageStats total={stats.total} free={stats.free} used={stats.used} />

      {loading ? (
        <ActivityIndicator size="large" color="#2E6AF3" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.path}
          contentContainerStyle={fileManagerStyles.list}
          ListEmptyComponent={<Text style={fileManagerStyles.emptyText}>Папка порожня</Text>}
          renderItem={({ item }) => (
            <FileItem item={item} onOpen={openItem} onInfo={showInfo} onDelete={deleteItem} onRename={openRename} />
          )}
        />
      )}

      <CreateFolderModal
        visible={showFolderModal}
        name={folderName}
        onChangeName={setFolderName}
        onCancel={() => {
          Keyboard.dismiss();
          setShowFolderModal(false);
          setFolderName('');
        }}
        onCreate={createFolder}
      />

      <CreateFileModal
        visible={showFileModal}
        name={fileName}
        content={fileContent}
        onChangeName={setFileName}
        onChangeContent={setFileContent}
        onCancel={() => {
          Keyboard.dismiss();
          setShowFileModal(false);
          setFileName('');
          setFileContent('');
        }}
        onCreate={createFile}
      />

      <RenameModal
        visible={!!renameTarget}
        name={renameName}
        onChangeName={setRenameName}
        isDirectory={renameTarget?.isDirectory}
        onCancel={() => {
          Keyboard.dismiss();
          setRenameTarget(null);
          setRenameName('');
        }}
        onRename={renameItem}
      />

      <View style={fileManagerStyles.bottomBar}>
        <TouchableOpacity
          style={fileManagerStyles.iconButton}
          onPress={goUp}
          disabled={currentDir === baseDir}
        >
          <MaterialIcons
            name="arrow-upward"
            size={22}
            color={currentDir === baseDir ? '#A0A3B1' : '#1E1E24'}
          />
          <Text style={fileManagerStyles.iconLabel}>Вгору</Text>
        </TouchableOpacity>
        <TouchableOpacity style={fileManagerStyles.iconButton} onPress={() => setShowFolderModal(true)}>
          <MaterialIcons name="create-new-folder" size={22} color="#1E1E24" />
          <Text style={fileManagerStyles.iconLabel}>Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={fileManagerStyles.iconButton} onPress={() => setShowFileModal(true)}>
          <MaterialIcons name="note-add" size={22} color="#1E1E24" />
          <Text style={fileManagerStyles.iconLabel}>Файл</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
