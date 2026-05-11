import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './src/components/MainStack';
import ContactsScreen from './src/screens/ContactsScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="Contacts" component={ContactsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
