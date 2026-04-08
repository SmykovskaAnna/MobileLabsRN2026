import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { darkTheme, lightTheme } from './src/styles/theme';
import { useGameState } from './src/state/gameState';

const Tab = createBottomTabNavigator();

const tabIconFor = (routeName) => {
  if (routeName === 'Home') return 'play';
  if (routeName === 'Tasks') return 'list';
  if (routeName === 'Settings') return 'settings';
  return 'ellipse';
};

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const { stats, actions, tasks, completedCount, resetAll } = useGameState();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: theme.accent,
              tabBarInactiveTintColor: theme.muted,
              tabBarStyle: {
                backgroundColor: theme.card,
                borderTopColor: theme.border,
              },
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={tabIconFor(route.name)} size={size} color={color} />
              ),
            })}
          >
            <Tab.Screen name="Home" options={{ title: 'Гра' }}>
              {(props) => <HomeScreen {...props} stats={stats} actions={actions} />}
            </Tab.Screen>
            <Tab.Screen name="Tasks" options={{ title: 'Завдання' }}>
              {(props) => <TasksScreen {...props} tasks={tasks} />}
            </Tab.Screen>
            <Tab.Screen name="Settings" options={{ title: 'Налаштування' }}>
              {(props) => (
                <SettingsScreen
                  {...props}
                  completedCount={completedCount}
                  totalCount={tasks.length}
                  onReset={resetAll}
                />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
