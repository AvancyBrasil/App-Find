import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/slices/userSlice';
import { Alert, View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const authResponse = await api.post('/login/usuarios', { email, senha, });

      if (authResponse.status === 200) {
        const { token } = authResponse.data;
      
        const userResponse = await api.get(`/usuarios/?email=${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      
        if (userResponse.status === 200) {
          const userData = userResponse.data;
      
          dispatch(setUserData(userData));
          console.log('Dados a serem passados:', userData);
          navigation.navigate('Home');
        }
      } 
      } catch (error) {
        if (error.response && error.response.status === 403) {
          Alert.alert('Erro de Login', 'Conta inativa. Entre em contato com o suporte.');
        } else {
          Alert.alert('Erro de Login', 'Email ou senha incorretos. Por favor, tente novamente.');
        }
      }
    }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.fullContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              alt="Sua Empresa"
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Endereço de email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                required
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <Text style={styles.label}>Senha</Text>

                <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
                  <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                autoComplete="current-password"
                required
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Não é membro?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={{ color: 'white' }}>Cadastre-se</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}