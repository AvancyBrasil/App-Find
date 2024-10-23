import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';


function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; 
  }

  let soma = 0;
  let resto;

  // Cálculo do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;

  // Cálculo do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Nome Completo.');
      return;
    }
    if (!cpf.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo CPF.');
      return;
    }

    if (!validarCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido.');
      return;
    }

    if (!telefone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Telefone.');
      return;
    }

    navigation.navigate('Cadastro2', { nome, cpf, dataNasc, telefone });
  };

  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
  
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11);
    }
 
    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
  
    return cpf;
  };

  const formatarData = (data) => {
  
    data = data.replace(/\D/g, '');

    // Verifica se a string tem 8 dígitos (DDMMYYYY)
    if (data.length === 8) {
        const dia = data.slice(0, 2);
        const mes = data.slice(2, 4);
        const ano = data.slice(4, 8);

        // Formata como YYYY-MM-DD com espaços
        return `${ano}-${mes}-${dia}`;
    }

    return data; // Retorna a data original se não tiver o formato esperado
};

  const formatarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, '');
  
    if (telefone.length > 11) {
      telefone = telefone.slice(0, 11);
    }
  
    if (telefone.length <= 11) {
      telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
      telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); 
    }
  
    return telefone;
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
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                keyboardType="default"
                autoCapitalize="none"
                value={nome}
                onChangeText={setNome}
                required
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="CPF"
                keyboardType="numeric"
                autoCapitalize="none"
                required
                value={cpf}
                onChangeText={(text) => setCpf(formatarCPF(text))}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                keyboardType="numeric"
                autoCapitalize="none"
                required
                value={dataNasc}
                onChangeText={(text) => setDataNasc(formatarData(text))}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="(11) 98765-4321"
                keyboardType="phone-pad"
                autoComplete="tel"
                required
                value={telefone}
                onChangeText={(text) => setTelefone(formatarTelefone(text))}
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