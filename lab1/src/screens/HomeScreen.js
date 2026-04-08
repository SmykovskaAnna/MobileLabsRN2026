import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/appStyles';

  const newsData = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    title: 'Заголовок новини',
    data: 'Дата новини',
    description: 'Короткий текст новини',
  }));

  export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={[{ padding: 16 }, styles.withFooterContent]}>

          <Text style={styles.heroTitle}>Новини</Text>
          {newsData.map((item) => (
            <View key={item.id} style={styles.newsItem}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDate}>{item.data}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
              </View>
            </View>
          ))}

      </ScrollView>

      <View style={[styles.footerContainer, { paddingBottom: insets.bottom }]}>
        <Text style={styles.footerText}>Смиковська Анна Володимирівна, ЗІПЗ-23-1</Text>
      </View>
    </SafeAreaView>
  );
}
