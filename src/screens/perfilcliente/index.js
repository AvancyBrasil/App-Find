import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import styles from './styles';
import Bottomnav from '../../routes/bootomnavbar';

export default function PerfilCliente() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email, id } = route.params || {};

  const [hidePass, setHidePass] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/usuarios/?email=${email}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUsuario(response.data[0]);
        } else {
          setError('Usuário não encontrado.');
        }
      } catch (error) {
        setError('Erro ao buscar cliente.');
        console.error('Erro ao buscar cliente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [email]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    senha: '',
    nome: '',
    cpf: '',
    nascimento: '',
    telefone: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    fotoPerfil: ''
  });

  const baseURL = 'http://192.168.15.10:4000/uploads/';

  useEffect(() => {
    if (usuario) {
      const fotoPerfilUrl = baseURL + usuario.fotoPerfil;
      setFormData({
        id: usuario.id,
        email: usuario.email,
        senha: usuario.senha,
        nome: usuario.nome,
        cpf: usuario.cpf,
        nascimento: usuario.dataNasc ? usuario.dataNasc.slice(0, 10) : '',
        telefone: usuario.telefone,
        cep: usuario.cep,
        logradouro: usuario.logradouro,
        bairro: usuario.bairro,
        cidade: usuario.cidade,
        fotoPerfil: fotoPerfilUrl
      });
    }
  }, [usuario]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    try {
      await api.put(`/usuarios/${id}`, formData);
      Alert.alert('Confirmar', 'As alterações foram salvas.');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar as informações.');
      console.error('Erro ao atualizar dados:', error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza de que deseja excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: async () => {
            try {
              await api.delete(`/usuarios/${id}`);
              Alert.alert("Conta excluída com sucesso");
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a conta.");
              console.error("Erro ao excluir conta:", error);
            }
          }
        }
      ]
    );
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Você precisa conceder acesso às suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      if (!imageUri) return;

      try {
        const formData = new FormData();
        formData.append('fotoPerfil', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'fotoPerfil.jpg',
        });

        const response = await api.put(`/usuarios/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setFormData(prevData => ({ ...prevData, fotoPerfil: imageUri }));
          setSelectedImage(imageUri); // Atualiza a imagem selecionada
        } else {
          Alert.alert('Erro', 'Não foi possível atualizar a imagem.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível atualizar a imagem.');
        console.error('Erro ao atualizar imagem:', error);
      }
    }
  };

  if (loading) return <View style={styles.containerPerfil}><Text style={styles.titleText}>Carregando...</Text></View>;
  if (error) return <View style={styles.containerPerfil}><Text style={styles.titleText}>{error}</Text></View>;
  if (!usuario) {
    return (
      <View style={styles.containerPerfil}>
        <Text style={styles.titleText}>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.background}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={selectedImage ? { uri: selectedImage } : { uri: formData.fotoPerfil }} 
            style={styles.foto}
            alt="Sua foto"
          />
          <Ionicons name="pencil" size={20} color="#FF8500" style={styles.editIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{usuario.nome}</Text>
        </View>
      </View>

      <View style={styles.containerInfo}>
        <View style={styles.infoPessoal}>
          <Text style={styles.textInfoCont}>Dados Pessoais</Text>
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.textInfoCont}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerCard}>
          {['email', 'senha', 'nome', 'cpf', 'nascimento', 'telefone', 'cep', 'logradouro', 'bairro', 'cidade'].map((field, index) => (
            <View key={field} style={[styles.cardInfo, index === 0 ? styles.firstCard : (index === 8 ? styles.lastCard : null)]}>
              <Text style={styles.textInfo}>{field.charAt(0).toUpperCase() + field.slice(1)}:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.textInput}
                  value={formData[field]}
                  onChangeText={(text) => handleInputChange(field, text)}
                  secureTextEntry={field === 'senha' && hidePass}
                />
              ) : (
                <Text style={styles.textInfo2}>{field === 'senha' && !isEditing ? '********' : formData[field]}</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {isEditing && (
        <>
          <View style={styles.containerBotoes}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text style={styles.textExcluirConta}>Excluir Conta</Text>
          </TouchableOpacity>
        </>
      )}

      {/* O botão de sair é exibido normalmente, mas fica invisível se estiver editando */}
      {!isEditing && (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textSairConta}>Sair da Conta</Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 160 }} />
    </ScrollView>
  );
}
