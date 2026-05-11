import { useState } from 'react';
import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/appStyles';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const hadleRegister = () => {
    console.log({ email, password, repeatPassword, lastName, firstName });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={[styles.formContainer, styles.withFooterContent]}>
        <Text style={styles.heroTitle}>Реєстрація</Text>

        <Text style={styles.inputLabel}>Електронна пошта</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Введіть електронну пошту"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Пароль</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Введіть пароль"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Пароль (ще раз)</Text>
        <TextInput
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          placeholder="Повторіть пароль"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Прізвище</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Введіть прізвище"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Ім'я</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Введіть ім'я"
          style={styles.input}
        />

        <Pressable style={styles.primaryButton} onPress={hadleRegister}>
          <Text style={styles.primaryButtonText}>Зареєструватися</Text>
        </Pressable>
      </ScrollView>

      <View style={[styles.footerContainer, { paddingBottom: insets.bottom }]}>
        <Text style={styles.footerText}>Смиковська Анна Володимирівна, ЗІПЗ-23-1</Text>
      </View>
    </SafeAreaView>
  );
}
