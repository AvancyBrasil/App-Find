import React, { useState } from 'react';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

export default function Cadastro3() {
  const navigation = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const payload = {
      ...route.params,
      email,
      senha
    };

    try {
      const response = await api.post('/usuarios', payload);
      if (response.status === 201) {
        Alert.alert('Cadastro efetuado com sucesso');
        navigation.navigate('Login');
      } else {
        console.error('Erro ao criar o cadastro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'O e-mail já está cadastrado. Tente usar outro e-mail.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          alt="Sua Empresa"
        />
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
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputArea}>
            <TextInput
              style={styles.inputSenha}
              placeholder="Senha"
              keyboardType="default"
              autoCapitalize="none"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={hidePass}
            />
            <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
              {hidePass ? (
                <Ionicons name="eye" color="#000000" size={25} />
              ) : (
                <Ionicons name="eye-off" color="#000000" size={25} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={hidePass}
            required
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}