import React, { useState } from 'react';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios'; // Importa o axios para fazer a requisição HTTP

export default function Cadastro2() {
  const navigation = useNavigation();
  const route = useRoute();
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  // Função para buscar as informações do CEP
  const buscaCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        return;
      }
      setLogradouro(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP. Verifique a conexão com a internet.');
    }
  };

  const handleCepChange = (text) => {
    const formattedCep = text.replace(/\D/g, '');
    setCep(formattedCep);

    if (formattedCep.length === 8) {
      buscaCep(formattedCep);
    }
  };

  const handleSubmit = () => {
    if (!cep.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo CEP.');
      return;
    }
    if (!logradouro.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Logradouro.');
      return;
    }
    if (!bairro.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Bairro.');
      return;
    }
    if (!cidade.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Cidade.');
      return;
    }

    navigation.navigate('Cadastro3', {
      ...route.params,
      cep,
      logradouro,
      bairro,
      cidade
    });
  };

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
              <Text style={styles.label}>CEP</Text>
              <TextInput
                style={styles.input}
                placeholder="12345-678"
                keyboardType="numeric"
                autoCapitalize="none"
                required
                value={cep}
                onChangeText={handleCepChange}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Logradouro</Text>
              <TextInput
                style={styles.input}
                placeholder="Logradouro"
                keyboardType="default"
                autoCapitalize="none"
                required
                value={logradouro}
                onChangeText={setLogradouro}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bairro</Text>
              <TextInput
                style={styles.input}
                placeholder="Bairro"
                keyboardType="default"
                autoCapitalize="none"
                required
                value={bairro}
                onChangeText={setBairro}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                autoComplete="name"
                required
                value={cidade}
                onChangeText={setCidade}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}