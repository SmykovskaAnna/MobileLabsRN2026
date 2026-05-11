import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  appRoot: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    gap: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  headerLogo: {
    width: 100,
    height: 64,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
  },
  formContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  newsItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  newsDate: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  newsDescription: {
    fontSize: 13,
    color: '#475569',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 2,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#64748B',
    fontStyle: 'italic',
  },
  withFooterContent: {
    paddingBottom: 32,
  },
  galleryContainer: {
    padding: 12,
  },
  imageCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 12,
    color: '#111',
  },
  inputLabel: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 6,
    color: '#111',
  },
  input: {
    borderWidth: 1,
    borderColor: '#93C5FD',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 15,
    color: '#111827',
  },

  primaryButton: {
    marginTop: 20,
    backgroundColor: '#1D4ED8',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  
});

export default styles;
