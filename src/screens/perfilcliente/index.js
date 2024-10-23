import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import api from '../../services/api';

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
        console.log('Resposta da API:', response.data);

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
      console.log('Dados do usuario no useEffect:', usuario);
      const fotoPerfilUrl = baseURL + usuario.fotoPerfil; // Concatenando o caminho base com o nome do arquivo
      console.log('URL da fotoPerfil:', fotoPerfilUrl); // Exibe a URI da imagem no console
      setFormData({
        id: usuario.id,
        email: usuario.email,
        senha: usuario.senha,
        nome: usuario.nome,
        cpf: usuario.cpf,
        nascimento: usuario.dataNasc,
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
    console.log(`Atualizando ${field} com valor ${value}`); // Verifique a atualização do estado
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
    const { id, ...data } = formData;
    Alert.alert(
      "Excluir Conta",
      "Tem certeza de que deseja excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: async () => {
            await api.delete(`/usuarios/${id}`, data);
            Alert.alert("Conta excluída com sucesso");
            navigation.navigate('Login');
          }
        }
      ]
    );
  };

  const handleLogoutPress = async () => {
    navigation.navigate('Login');
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
      console.log('Imagem selecionada:', imageUri);

      if (!imageUri) {
        console.log('URI da imagem está vazia ou inválida');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('fotoPerfil', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'fotoPerfil.jpg',
        });

        console.log('FormData criado:', formData);

        const response = await api.put(`/usuarios/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setFormData(prevData => ({ ...prevData, fotoPerfil: imageUri }));
          console.log('Sucesso', 'Imagem de perfil atualizada!');
        } else {
          console.log('Erro', 'Não foi possível atualizar a imagem.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível atualizar a imagem.');
        console.error('Erro ao atualizar imagem:', error);
      }
    } else {
      console.log("Seleção de imagem cancelada");
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
      <TouchableOpacity style ={styles.backButton} onPress={navigation.goBack}> 
          <AntDesign  name="leftcircle" size={35} color="white" /> 
          </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            alt="Sua Empresa"
          />
        </TouchableOpacity>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerPerfil}>
        <Text style={styles.titleText}>Seu Perfil</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={selectedImage ? { uri: selectedImage } : { uri: formData.fotoPerfil }} 
            style={styles.foto}
            alt="Sua foto"
          />
        </TouchableOpacity>
        <Text style={styles.nameText}>{usuario.nome}</Text>
        <Text style={styles.bioText}>{usuario.cidade}</Text>
      </View>

      {/* Conta Section */}
      <View style={styles.containerInfo}>
        <View style={styles.infoPessoal}>
          <Text style={styles.textInfoCont}>Conta</Text>
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.textInfoCont}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>Email:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.email} 
                onChangeText={(text) => handleInputChange('email', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.email}</Text>
            )}
          </View>
          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>Senha:</Text>
            {isEditing ? (
              <View style={styles.inputArea}>
                <TextInput
                  style={styles.textInput}
                  value={formData.senha}
                  onChangeText={(text) => handleInputChange('senha', text)}
                  secureTextEntry={hidePass}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                  {hidePass ? (
                    <Ionicons name="eye-off" color="#FFFFFF" size={25} />
                  ) : (
                    <Ionicons name="eye" color="#FFFFFF" size={25} />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.textInfo2}>{formData.senha}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Perfil Section */}
      <View style={styles.containerInfo}>
        <View style={styles.infoPessoal}>
          <Text style={styles.textInfoCont}>Perfil</Text>
        </View>

        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>Nome:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.nome}
                onChangeText={(text) => handleInputChange('nome', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.nome}</Text>
            )}
          </View>
          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>CPF:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.cpf}
                onChangeText={(text) => handleInputChange('cpf', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.cpf}</Text>
            )}
          </View>
        </View>
        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>Data de Nascimento:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.nascimento}
                onChangeText={(text) => handleInputChange('nascimento', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.nascimento}</Text>
            )}
          </View>
          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>Telefone:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.telefone}
                onChangeText={(text) => handleInputChange('telefone', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.telefone}</Text>
            )}
          </View>
        </View>
        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>CEP:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.cep}
                onChangeText={(text) => handleInputChange('cep', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.cep}</Text>
            )}
          </View>
          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>Logradouro:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.logradouro}
                onChangeText={(text) => handleInputChange('logradouro', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.logradouro}</Text>
            )}
          </View>
        </View>
        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>Bairro:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.bairro}
                onChangeText={(text) => handleInputChange('bairro', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.bairro}</Text>
            )}
          </View>
          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>Cidade:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.cidade}
                onChangeText={(text) => handleInputChange('cidade', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.cidade}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Ação de Confirmação e Cancelamento */}
      <View style={styles.actionContainer}>
        {isEditing && (
          <>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}