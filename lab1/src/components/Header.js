import { View, Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/appStyles';

export default function Header() {
  const insets = useSafeAreaInsets();

  const headerTopPadding = Math.max(insets.top - 8, 0);

  return (
    <View style={[styles.headerContainer, { paddingTop: headerTopPadding }]}>
      <Image source={require('../../assets/icon.png')} style={styles.headerLogo} />
      <Text style={styles.headerTitle}>FirstMobileApp</Text>
    </View>
  );
}
