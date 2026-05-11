import { FlatList, View, Image, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/appStyles';

const images = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
}));

export default function ListScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={[styles.galleryContainer, styles.withFooterContent]}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={styles.imageCard}>
            <Image source={item.source} style={styles.galleryImage} />
          </View>
        )}
      />

      <View style={[styles.footerContainer, { paddingBottom: insets.bottom }]}>
        <Text style={styles.footerText}>Смиковська Анна Володимирівна, ЗІПЗ-23-1</Text>
      </View>
    </SafeAreaView>
  );
}
