import { StatusBar } from 'expo-status-bar';
import { View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Header from './src/components/Header';
import styles from './src/styles/appStyles';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.appRoot}>
          <StatusBar style="dark" />
          <Header />
          <View style={styles.screenContainer}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                  let iconName;
                  if (route.name === 'Головна') iconName = 'home';
                  else if (route.name === 'Фотогалерея') iconName = 'images';
                  else if (route.name === 'Профіль') iconName = 'person';
                  return <Ionicons name={iconName} size={22} color={color} />;
                },
                tabBarShowIcon: true,
                tabBarActiveTintColor: '#1D4ED8',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarIndicatorStyle: { height: 0 },
                tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: -4 },
                tabBarIconStyle: { marginBottom: -4 },
                tabBarStyle: { backgroundColor: '#F1F5F9' },
                tabBarButton: (props) => (
                  <Pressable
                    {...props}
                    style={[
                      props.style,
                      {
                        borderRadius: 10,
                        margin: 4,
                        backgroundColor: props.accessibilityState?.selected ? '#DBEAFE' : 'transparent',
                      },
                    ]}
                  />
                ),
              })}
            >
              <Tab.Screen name="Головна" component={HomeScreen} />
              <Tab.Screen name="Фотогалерея" component={ListScreen} />
              <Tab.Screen name="Профіль" component={ProfileScreen} />
            </Tab.Navigator>
          </View>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
