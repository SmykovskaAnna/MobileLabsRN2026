import { DrawerItem } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import { styles } from '../styles/drawerStyles';

export default function CustomDrawerContent(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/avatar.jpeg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Анна Смиковська Володимирівна</Text>
        <Text style={styles.group}>Група: ЗІПЗ-23-1</Text>
      </View>
      <View style={styles.items}>
        <DrawerItem label="Новини" onPress={() => props.navigation.navigate('Home')} />
        <DrawerItem
          label="Контакти"
          onPress={() => props.navigation.navigate('Contacts')}
        />
      </View>
    </View>
  );
}
