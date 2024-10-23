import React from 'react';
import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default function EsqueceuSenha(){
  const navigation = useNavigation();
    return(
<View style={{ flex: 1, backgroundColor: '#050521' }}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          alt="Sua Empresa"
        />
         <Text style={styles.title}>Coloque seu Email</Text>
         <Text style={styles.subtitle}>Enviaremos uma redefinição de senha!</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="fulano@gmail.com"
            keyboardType="default"
            autoCapitalize="none"
            required
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Recuperar</Text>
        </TouchableOpacity>
      </View>
    </View>
      );
}