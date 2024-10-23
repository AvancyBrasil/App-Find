import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Image, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import api from '../../services/api';

export default function Lojista() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params || {};

  const [empresario, setEmpresario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const baseURL = 'http://192.168.15.3:4000/uploads/';

  useEffect(() => {
    const fetchLojista = async () => {
      try {
        const response = await api.get(`/lojistas?email=${email}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
            setEmpresario(response.data[0]);
        } else {
            setError('Usuário não encontrado.');
        }
        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar lojista: ' + err);
        console.error('Erro ao buscar lojista:', err);
      }
    };

    if (email) {
      fetchLojista();
    } else {
      setLoading(false);
      setError('Email não fornecido.');
    }
  }, [email]);

  if (loading) return <View style={styles.containerPerfil}><Text style={styles.titleText}>Carregando...</Text></View>;
  if (error) return <View style={styles.containerPerfil}><Text style={styles.titleText}>{error}</Text></View>;
  if (!empresario) {
    return <View style={styles.containerPerfil}>
        <Text style={styles.titleText}>Lojista não encontrado.</Text>
      </View>
    ;
  }

  const fotoPerfilUrl = baseURL + empresario.fotoPerfil;

  return (
    <ScrollView style={styles.background}>
        <View style={styles.headerContainer}>
        <TouchableOpacity style ={styles.backButton} onPress={navigation.goBack}> 
          <AntDesign  name="leftcircle" size={35} color="white" /> 
          </TouchableOpacity>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          alt="Sua Empresa"
        />
        </View>

        <View style={styles.containerPerfil}>
        <Text style={styles.titleText}>Perfil do Lojista</Text>
    <View style={styles.containerPerfil}>
        <Text style={styles.nameText}>{empresario.nome}</Text>
        <Text style={styles.bioText}>{empresario.logradouro}</Text>
      </View>
      </View>
      <View style={styles.containerCard}>
        <Image source={{ uri: fotoPerfilUrl }} style={styles.image} />
        <Text style={styles.infoText}>Nome: {empresario.nome}</Text>
        <Text style={styles.infoText}>Email: {empresario.email}</Text>
        <Text style={styles.infoText}>CNPJ: {empresario.cnpj}</Text>
        <Text style={styles.infoText}>CEP: {empresario.cep}</Text>
        <Text style={styles.infoText}>Logradouro: {empresario.logradouro}</Text>
        <Text style={styles.infoText}>Cidade: {empresario.cidade}</Text>
        <Text style={styles.infoText}>Lagitude: {empresario.lagitude}</Text>
        <Text style={styles.infoText}>Longitude: {empresario.longitude}</Text>
        </View>
    </ScrollView>
  );
}
