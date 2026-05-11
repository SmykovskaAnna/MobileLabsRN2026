import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    height: 12,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
});
