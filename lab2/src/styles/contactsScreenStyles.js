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
  sectionHeader: {
    paddingTop: 12,
    paddingBottom: 6,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    height: 12,
  },
});
