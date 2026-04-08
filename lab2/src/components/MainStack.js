import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

function HamburgerButton() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.openDrawer()} style={{ marginLeft: 16 }}>
      <Ionicons name="menu" size={26} color="#000" />
    </Pressable>
  );
}

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: 'News', headerLeft: () => <HamburgerButton /> }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Details',
        })}
      />
    </Stack.Navigator>
  );
}
