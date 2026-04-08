import { Image, Text, View } from 'react-native';
import { styles } from '../styles/detailsScreenStyles';

export default function DetailsScreen({ route }) {
  const { title, description, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
